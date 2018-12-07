import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-payment-recipt',
    templateUrl: './payment-recipt.component.html',
    styleUrls: ['./payment-recipt.component.scss']
})
export class PaymentReciptComponent implements OnInit {

    @Input() reciptData: {};

    constructor() { }

    ngOnInit() {
    }

    getCurrentDataResponse() {
        console.log(this.reciptData);
    }

}
