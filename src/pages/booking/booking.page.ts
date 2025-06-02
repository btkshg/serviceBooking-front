import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

// This component will be visible if user successfully booked a service.
@Component({
  selector: 'booking-page',
  templateUrl: './booking.page.html',
  standalone: true,
})
export class bookingPage {

  constructor(private router: Router, private route: ActivatedRoute) {}

  // Initializing variables to store booking details that will be updated from the query parameters.
  date = '';
  time = '';
  name = '';

  // Setting the values from the query parameters when the component is initialized.
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.name = params['name'];
      this.date = params['date'];
      this.time = params['time'];
    });
    console.log('BookingPage initialized'); 
  }

  // This method is directing user to see their new and previous bookings.
  goToBookings() {
    this.router.navigate(['/profile']);
  }
}
