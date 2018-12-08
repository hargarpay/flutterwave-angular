import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import TinyDatePicker from 'tiny-date-picker';
import Choices from 'choices.js';
import { data } from './data';

@Component({
    selector: 'app-booking',
    templateUrl: './booking.component.html',
    styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
    data = data;
    @Output() raveDataEmit = new EventEmitter<{}>();
    amount: Number = 0;
    amount_per_person: Number = 0;
    number_of_booking: Number = 1;
    active: Boolean = true;
    firstname: String = '';
    lastname: String = '';
    email: String = '';
    phone: String = '';
    departure: String = '';
    destination: String = '';
    bookingRoute: String = '';
    departureDate: String = '';
    seatNumber = [];
    seatNumberString: String = '';

    constructor() { }

    ngOnInit() {
        this.initialSelectFields();
        TinyDatePicker(document.getElementById('dateDepartue'));
        console.log(this.data);
    }

    onChangeHandler(evt) {
        this.amount = isNaN(parseInt(evt.target.value, 10)) ? 0 : 5000 * parseInt(evt.target.value, 10);
        if (this.amount > 0) {
            this.active = false;
        } else {
            this.active = true;
        }
    }

    initialSelectFields() {
        const travellingFrom = document.getElementById('travellingFrom');
        const travellingTo = document.getElementById('travellingTo');
        const adult = document.getElementById('adult');
        const choicesFrom = new Choices(travellingFrom);
        const choicesTo = new Choices(travellingTo);
        const choicesAdult = new Choices(adult);
        choicesFrom.setChoices(
            this.data.map(datum => (
                {
                    value: datum.from,
                    label: datum.from.replace(/^\w/, c => c.toUpperCase())
                }
            )),
            'value',
            'label',
            false
        );

        travellingFrom.addEventListener('addItem', (event) => {
            // do something creative here...
            this.departure = (<CustomEvent>event).detail.value;
            const [filtered_route] = this.data.filter(datum => datum.from === this.departure);
            if (filtered_route !== undefined) {
                const destination_route = filtered_route.to;
                choicesTo
                    .clearStore()
                    .setChoices(
                        destination_route.map(route => ({
                            value: route.amount,
                            label: route.location.replace(/^\w/, c => c.toUpperCase())
                        })),
                        'value',
                        'label',
                        false
                    );
            }
        }, false);

        travellingTo.addEventListener('addItem', (evt) => {
            this.destination = (<CustomEvent>evt).detail.label;
            this.amount_per_person = parseInt((<CustomEvent>evt).detail.value, 10);
            this.bookingRoute = this.departure.replace(/^\w/, c => c.toUpperCase()) + ' to ' + this.destination;
            this.currentAmount(this.amount_per_person, this.number_of_booking);
        }, false);


        adult.addEventListener('addItem', (event) => {
            // do something creative here...
            this.number_of_booking = parseInt((<CustomEvent>event).detail.value, 10);
            this.currentAmount(this.amount_per_person, this.number_of_booking);
        }, false);
    }

    currentAmount(amount, person) {
        this.amount = amount * person;
        this.changeButtonStatus();
    }

    updateValue(event) {
        this[event.target.name] = event.target.value;
        this.changeButtonStatus();
    }

    getDepartureDate(event) {
        this.departureDate = event.target.value;
        this.changeButtonStatus();
    }

    getSelectedSeats(event) {
        const replacement = ' and';
        this.seatNumber = Array.from(event);
        this.seatNumberString = this.seatNumber
            .join(', ')
            .replace(/,([^,]*)$/, replacement + '$1');
        this.changeButtonStatus();
    }


    paymentSuccess(evt) {
        evt.bookingRoute = this.bookingRoute;
        evt.numberOfBooking = this.number_of_booking;
        evt.departureDate = this.departureDate;
        evt.seatNumberString = this.seatNumberString;
        this.raveDataEmit.emit(evt);
    }

    changeButtonStatus() {
        if (
            this.amount > 0
            && this.firstname.length > 2
            && this.validateEmail(this.email)
            && this.phone.length > 7
            && this.departureDate.includes('/')
            && this.number_of_booking === this.seatNumber.length
        ) {
            this.active = false;
        } else {
            this.active = true;
        }
    }

    validateEmail(email) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }

    paymentFailure() {
        console.log('This has close');
    }

}
