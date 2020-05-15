import { Component, OnInit, Output, EventEmitter, AfterViewInit, Input } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Vehicle } from '../models/vehicle.model';

@Component({
  selector: 'app-car-information',
  templateUrl: './car-information.component.html',
  styleUrls: ['./car-information.component.scss']
})
export class CarInformationComponent implements OnInit, AfterViewInit {
  @Output() vehicleInfo = new EventEmitter<Vehicle>();
  @Input() private clearForm: EventEmitter<boolean>;
  public minLength = 3;
  public minYearLength = 4;
  vehicleProfile = this.fb.group({
    year: new FormControl('', [
      Validators.required,
      Validators.minLength(this.minYearLength)
    ]),
    make: new FormControl('', [
      Validators.required,
      Validators.minLength(this.minLength)
    ]),
    model: new FormControl('', [
      Validators.required,
      Validators.minLength(this.minLength)
    ]),
    color: new FormControl('', [
      Validators.required,
      Validators.minLength(this.minLength)
    ]),
    license: new FormControl('', [
      Validators.required,
      Validators.minLength(this.minLength)
    ]),
  });
  constructor(private fb: FormBuilder) {
   }

  ngOnInit(): void {
    if (this.clearForm) {
      this.clearForm.subscribe(value => {
        if (value === true) {
          this.resetVehicleInfo();
        }
      })
    }
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
  resetVehicleInfo(): void {
    this.vehicleProfile.reset();
  }
  get vehicleFormControl() {
    return this.vehicleProfile.controls;
  }

}
