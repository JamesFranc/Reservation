import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms'
import { Customer } from '../models/customer.model';

@Component({
  selector: 'app-customer-information',
  templateUrl: './customer-information.component.html',
  styleUrls: ['./customer-information.component.scss']
})
export class CustomerInformationComponent implements OnInit {
  @Output() customerInfo = new EventEmitter<Customer>();
  customerProfile = this.fb.group({
    firstName: new FormControl('', [
      Validators.required,
    ]),
    lastName:  new FormControl('', [
      Validators.required,
    ]),
    // address: this.fb.group({
    //   street:  new FormControl('', [
    //     Validators.required,
    //   ]),
    //   city:  new FormControl('', [
    //     Validators.required,
    //   ]),
    //   state:  new FormControl('', [
    //     Validators.required,
    //     Validators.minLength(2),
    //     Validators.maxLength(2)
    //   ]),
    //   zip: new FormControl('', [
    //     Validators.required,
    //     Validators.minLength(5),
    //     Validators.maxLength(5)
    //   ]),
    // }),
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
  });
  customerControlFields = [];
  constructor(private fb: FormBuilder) {
   }

  ngOnInit(): void {
    this.customerControlFields = Array.from(Object.keys(this.customerProfile.controls));
  }
  ngAfterViewInit(): void {
    this.customerProfile.valueChanges.subscribe(vehicleInfoChanges => {
      if (this.customerProfile.valid) {
        this.setCustomerInfo();
      }
    })
  }
  setCustomerInfo(): void {
    if (this.customerProfile.valid) {
      this.customerInfo.emit(<Customer> {
        'firstName': this.customerProfile.controls.firstName.value,
        'lastName': this.customerProfile.controls.lastName.value,
        'phone': this.customerProfile.controls.phone.value,
        'email': this.customerProfile.controls.email.value,
      })
    }
  }

}
