import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Vehicle } from '../models/vehicle.model';

@Component({
  selector: 'app-car-information',
  templateUrl: './car-information.component.html',
  styleUrls: ['./car-information.component.scss']
})
export class CarInformationComponent implements OnInit, AfterViewInit {
  @Output() vehicleInfo = new EventEmitter<Vehicle>();
  vehicleProfile = this.fb.group({
    year: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    make: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    model: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    color: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
  });
  constructor(private fb: FormBuilder) {
   }

  ngOnInit(): void {
    console.log(this.vehicleProfile);
  }
  ngAfterViewInit(): void {
    this.vehicleProfile.valueChanges.subscribe(vehicleInfoChanges => {
      if (this.vehicleProfile.valid) {
        this.setVehicleInfo();
      }
    })
  }
  setVehicleInfo() {
    if (this.vehicleProfile.valid) {
      this.vehicleInfo.emit(<Vehicle> {
        'year': this.vehicleProfile.controls.year.value,
        'make': this.vehicleProfile.controls.make.value,
        'model': this.vehicleProfile.controls.model.value,
        'color': this.vehicleProfile.controls.color.value,
      })
    }
  }

}
