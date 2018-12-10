import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularRaveModule } from 'angular-rave';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookingComponent } from './booking/booking.component';
import { PaymentReciptComponent } from './payment-recipt/payment-recipt.component';
import { SeatNumberComponent } from './booking/seat-number/seat-number.component';
import { DataCenterService } from './data-center.service';

@NgModule({
    declarations: [
        AppComponent,
        BookingComponent,
        PaymentReciptComponent,
        SeatNumberComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AngularRaveModule
    ],
    providers: [DataCenterService],
    bootstrap: [AppComponent]
})
export class AppModule { }
