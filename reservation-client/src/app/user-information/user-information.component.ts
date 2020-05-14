import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.scss']
})
export class UserInformationComponent implements OnInit {
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
    console.log(this.userProfile);
    this.userControls = Array.from(Object.keys(this.userProfile.controls));
  }

}
