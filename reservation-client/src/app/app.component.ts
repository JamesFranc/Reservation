import { Component, Output, EventEmitter } from '@angular/core';
import { CustomerInformationComponent } from './customer-information/customer-information.component';
import { CarInformationComponent } from './car-information/car-information.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { Vehicle } from './models/vehicle.model';
import { Customer } from './models/customer.model';
import { Subject, combineLatest } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  //implement a snackbar for user feedback on successful submission
  private reservationValidSource = new Subject<boolean>();
  public reservationValid$ = this.reservationValidSource.asObservable();
  private customerInformationUpdateSource = new Subject<boolean>();
  public customerInformationUpdate$ = this.customerInformationUpdateSource.asObservable();
  private vehicleInformationUpdateSource = new Subject<boolean>();
  public vehicleInformationUpdate$ = this.vehicleInformationUpdateSource.asObservable();
  private scheduleInformationUpdateSource = new Subject<boolean>();
  public scheduleInformationUpdate$ = this.scheduleInformationUpdateSource.asObservable();

  public canSubmit = false;
  public reservations = new Array<Reservation>();
  public clearForms: EventEmitter<boolean> = new EventEmitter();

  
  ngOnInit(): void {
    this.reservationValidSource.next(false);
    this.customerInformationUpdateSource.next(false);
    this.vehicleInformationUpdateSource.next(false);
    this.scheduleInformationUpdateSource.next(false);
    this.clearForms.emit(false);
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
      if(customerInfoReady && vehicleInfoReady && scheduleInfoReady) {
        this.reservationValidSource.next(true);
      }
    });

    this.reservationValid$.subscribe(value => {
      this.canSubmit = value;
    });
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
    this.resetForms();
  }

  resetForms(): void {
    this.clearForms.emit(true);
  }

}
