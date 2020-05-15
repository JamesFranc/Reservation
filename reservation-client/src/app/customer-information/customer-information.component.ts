import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-customer-information',
  templateUrl: './customer-information.component.html',
  styleUrls: ['./customer-information.component.scss']
})
export class CustomerInformationComponent implements OnInit {
  userProfile = this.fb.group({
    firstName: new FormControl('', [
      Validators.required,
    ]),
    lastName:  new FormControl('', [
      Validators.required,
    ]),
    address: this.fb.group({
      street:  new FormControl('', [
        Validators.required,
      ]),
      city:  new FormControl('', [
        Validators.required,
      ]),
      state:  new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(2)
      ]),
      zip: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(5)
      ]),
    }),
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
  });
  userControls = [];
  constructor(private fb: FormBuilder) {
   }

  ngOnInit(): void {
    this.userControls = Array.from(Object.keys(this.userProfile.controls));
  }

}
