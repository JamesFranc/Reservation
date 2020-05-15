import { Component } from '@angular/core';
import { CustomerInformationComponent } from './customer-information/customer-information.component';
import { CarInformationComponent } from './car-information/car-information.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { Vehicle } from './models/vehicle.model';
import { Customer } from './models/customer.model';
import { Subject, combineLatest } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { Reservation } from './models/reservation.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'St. Charles Automotive';
  customerInfo:Customer;
  vehicleInfo:Vehicle;
  scheduleInfo = {
    date:'',
    time:''
  };
  private reservationValidSource = new Subject<boolean>();
  reservationValid$ = this.reservationValidSource.asObservable();
  private customerInformationUpdateSource = new Subject<boolean>();
  customerInformationUpdate$ = this.customerInformationUpdateSource.asObservable();
  private vehicleInformationUpdateSource = new Subject<boolean>();
  vehicleInformationUpdate$ = this.vehicleInformationUpdateSource.asObservable();
  private scheduleInformationUpdateSource = new Subject<boolean>();
  scheduleInformationUpdate$ = this.scheduleInformationUpdateSource.asObservable();
  canSubmit = false;
  reservations = new Array<Reservation>();
  ngOnInit(): void {
    this.reservationValidSource.next(false);
    this.customerInformationUpdateSource.next(false);
    this.vehicleInformationUpdateSource.next(false);
    this.scheduleInformationUpdateSource.next(false);
  }
  ngAfterViewInit(): void {
    combineLatest(
      this.customerInformationUpdate$,
      this.vehicleInformationUpdate$,
      this.scheduleInformationUpdate$
    ).pipe(
      filter(([customerInfoReady, vehicleInfoReady, scheduleInfoReady]) => !!customerInfoReady && !!vehicleInfoReady && !!scheduleInfoReady)
    )
    .subscribe(([customerInfoReady, vehicleInfoReady, scheduleInfoReady]) => {
      console.log('customerInfoReady: ', customerInfoReady)
      console.log('vehicleInfoReady: ', vehicleInfoReady)
      console.log('scheduleInfoReady: ', scheduleInfoReady)
      if(customerInfoReady && vehicleInfoReady && scheduleInfoReady) {
        this.reservationValidSource.next(true);
      }
    });
    this.reservationValid$.subscribe(value => {
      console.log("reservationValid value: ", value);
      this.canSubmit = value;
    })
  }
  setDate(date) : void {
    this.scheduleInfo.date = date;
    this.scheduleInformationUpdateSource.next(true);
  }

  setVehicle(vehicle: Vehicle) : void {
    this.vehicleInfo = vehicle;
    this.vehicleInformationUpdateSource.next(true);
  }

  setCustomer(customer: Customer) : void {
    this.customerInfo = customer;
    this.customerInformationUpdateSource.next(true);
  }

  submitReservation(): void {
    if (!this.canSubmit) return;
    this.reservations.push(<Reservation>{
      customer: this.customerInfo,
      vehicle: this.vehicleInfo,
      date: new Date(this.scheduleInfo.date)
    });
    console.log(this.reservations);
  }

  resetForms(): void {

  }

}
