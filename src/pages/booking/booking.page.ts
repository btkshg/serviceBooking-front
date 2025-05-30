import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'booking-page',
  templateUrl: './booking.page.html',
  standalone: true,
})
export class bookingPage {

  constructor(private router: Router) {}

  goToBookings() {
    this.router.navigate(['/profile']);
  }
}
