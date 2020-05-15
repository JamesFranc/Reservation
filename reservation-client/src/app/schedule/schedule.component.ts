import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatInput } from '@angular/material/input';
// import { MatDatepickerModule, MatDatepicker } from '@angular/material/datepicker'

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  @Output() selectedDate = new EventEmitter<string>();
  @Input() private clearForm: EventEmitter<boolean>;
  
  date: Date;

  dateFilter = (d: Date | null): boolean => {
    const today = new Date();
    const day = d;
    // Prevent Saturday and Sunday from being selected.
    return day > today;
  }
  constructor() { }
  ngOnInit(): void {
    if (this.clearForm) {
      this.clearForm.subscribe(value => {
        if (value === true) {
          this.resetDate();
        }
      })
    }
  }
  
  selectDate(date) {
    this.selectedDate.emit(date)
  }
  resetDate(): void {
    this.date = null;
  }
}
