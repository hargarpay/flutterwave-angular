import { Component, OnInit } from '@angular/core';
import { RaveOptions } from 'angular-rave';

@Component({
    selector: 'app-booking',
    templateUrl: './booking.component.html',
    styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
    amount: Number = 0;
    active: Boolean = true;

    constructor() { }

    ngOnInit() { }

    onChangeHandler(evt) {
        this.amount = isNaN(parseInt(evt.target.value, 10)) ? 0 : 5000 * parseInt(evt.target.value, 10);
        if (this.amount > 0) {
            this.active = false;
        } else {
            this.active = true;
        }
    }

    paymentSuccess(evt) {
        console.log(evt);
    }

    paymentFailure() {
        console.log('This has close');
    }

}
