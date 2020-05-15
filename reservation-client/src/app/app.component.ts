import { Component } from '@angular/core';
import { CustomerInformationComponent } from './customer-information/customer-information.component';
import { CarInformationComponent } from './car-information/car-information.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { Vehicle } from './models/vehicle.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'St. Charles Automotive';
  userInfo = {};
  vehicleInfo:Vehicle;
  scheduleInfo = {
    date:''
  };
  reservationValid = false;

  setDate(date) : void {
    this.scheduleInfo.date = date;
    console.log('the scheduled date is: ', this.scheduleInfo.date);
  }
  setVehicle(vehicle: Vehicle) : void {
    this.vehicleInfo = vehicle;
    console.log('the vehicle info is: ', this.vehicleInfo);
  }
}
