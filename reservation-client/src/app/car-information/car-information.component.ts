import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-car-information',
  templateUrl: './car-information.component.html',
  styleUrls: ['./car-information.component.scss']
})
export class CarInformationComponent implements OnInit {
  
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

}
