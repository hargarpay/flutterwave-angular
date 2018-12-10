import { Component, OnInit } from '@angular/core';
import { DataCenterService } from './data-center.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'flutterwave';
    reciptActive: Boolean = false;
    receiptData: {};
    constructor(private dataCenter: DataCenterService) { }
    ngOnInit() {
        this.dataCenter.dataRaveEvent.subscribe(
            (response) => {
                this.reciptActive = true;
                this.receiptData = response;
            }
        );
    }
    getRaveDataResponse(evt) {
        console.log('Parebt Component');
    }
}
