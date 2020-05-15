import { Component, OnInit, Output, EventEmitter, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
// import { MatDatepickerModule, MatDatepicker } from '@angular/material/datepicker'

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, AfterViewInit {

  @Output() selectedDate = new EventEmitter<string>();

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }
  
  constructor() { }
  selectDate(date) {
    // console.log(event)
    this.selectedDate.emit(date)
  }
  ngOnInit(): void {
  }
  
  ngAfterViewInit(): void {
    
  }

}
