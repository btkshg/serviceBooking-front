import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'booking-page',
  templateUrl: './booking.page.html',
  standalone: true,
})
export class bookingPage {

  constructor(private router: Router, private route: ActivatedRoute) {}

  date = '';
  time = '';
  name = '';

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.name = params['name'];
      this.date = params['date'];
      this.time = params['time'];
    });
    console.log('BookingPage initialized'); 
  }

  goToBookings() {
    this.router.navigate(['/profile']);
  }
}
