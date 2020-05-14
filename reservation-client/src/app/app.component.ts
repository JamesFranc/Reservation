import { Component } from '@angular/core';
import { UserInformationComponent } from './user-information/user-information.component';
import { CarInformationComponent } from './car-information/car-information.component';
import { ScheduleComponent } from './schedule/schedule.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'St. Charles Automotive';
  userInfo = {};
  vehicleInfo = {};
  scheduleInfo = {};
  reservationValid = false;
}
