import { Customer } from './customer.model';
import { Vehicle } from './vehicle.model';

export class Reservation {
    customer: Customer;
    vehicle: Vehicle;
    date: Date;
    time?: string;
   }