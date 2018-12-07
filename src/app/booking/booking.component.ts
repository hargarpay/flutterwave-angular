import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

    constructor() { }

    ngOnInit() {
        this.initialSelectFields();
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
        if (this.amount > 0) {
            this.active = false;
        } else {
            this.active = true;
        }
    }

    updateValue(event) {
        this[event.target.name] = event.target.value;
    }


    paymentSuccess(evt) {
        evt.bookingRoute = this.bookingRoute;
        evt.numberOfBooking = this.number_of_booking;
        this.raveDataEmit.emit(evt);
    }

    paymentFailure() {
        console.log('This has close');
    }

}
