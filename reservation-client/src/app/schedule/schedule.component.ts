import { Component, OnInit } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker'

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
