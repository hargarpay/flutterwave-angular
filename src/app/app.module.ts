import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularRaveModule } from 'angular-rave';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookingComponent } from './booking/booking.component';
import { PaymentReciptComponent } from './payment-recipt/payment-recipt.component';

@NgModule({
    declarations: [
        AppComponent,
        BookingComponent,
        PaymentReciptComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AngularRaveModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
