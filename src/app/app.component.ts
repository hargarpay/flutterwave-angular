import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'flutterwave';
    raveDataResponse: {};
    reciptActive: Boolean = false;
    getRaveDataResponse(evt) {
        this.raveDataResponse = evt;
        this.reciptActive = true;
        console.log('Parebt Component');
        console.log(this.raveDataResponse);
    }
}
