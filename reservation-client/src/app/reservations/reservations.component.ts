import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Reservation } from '../models/reservation.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit, AfterViewInit {

  constructor() { }
  @Input('scheduled') scheduled: Observable<Reservation[]>;
  public scheduledReservations: Reservation[];
  ngOnInit(): void {
    this.scheduledReservations = new Array<Reservation>();
  }
  ngAfterViewInit(): void {
    if (this.scheduled) {
      this.scheduled.subscribe(reservations => {
        this.scheduledReservations = reservations;
      })
    }
  }

}
