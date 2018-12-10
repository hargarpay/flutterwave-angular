import { Component, OnInit, Input } from '@angular/core';
import { DataCenterService } from '../data-center.service';

@Component({
    selector: 'app-payment-recipt',
    templateUrl: './payment-recipt.component.html',
    styleUrls: ['./payment-recipt.component.scss']
})
export class PaymentReciptComponent implements OnInit {

    @Input() reciptData: {};

    constructor(private dataCenter: DataCenterService) { }

    ngOnInit() {
        this.getCurrentDataResponse();
    }

    getCurrentDataResponse() {
        console.log(this.reciptData);
    }

}
