import { Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'service-page',
  templateUrl: './service.page.html',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule, FormsModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, MatCardModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class servicePage {
  allTimeSlots: string[] = [];
  timeSlots: { time: string; free: boolean }[] = [];
  selectedTime: string | null = null;
  selected: Date = new Date();
  minDate: Date = new Date();
  id: null | number = null;
  name: null | string = null;
  duration: null | string = null;

  constructor(
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private MatSnackBar: MatSnackBar
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnInit() {
    const startHour = 10;
    const endHour = 18;
    this.timeSlots = [];

    for (let hour = startHour; hour < endHour; hour++) {
      this.timeSlots.push(
        { time: `${hour}:00`, free: true },
        { time: `${hour}:30`, free: true }
      );
    }

    this.fetchBookedTimes(this.selected);

    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.name = params['name'];
      this.duration = params['dur'];
    });


  }

  selectTime(slot: any) {
    if(slot.free === true) {
      this.selectedTime = this.selectedTime === slot.time ? null : slot.time;
    }
  }

  onDateChange(event: Date) {
    this.selected = event;
    console.log('Selected date:', this.selected);
    this.fetchBookedTimes(event);
  }

  fetchBookedTimes(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const formatted = `${year}-${month}-${day}`;

    this.http.get<any[]>(`http://localhost:3000/orders/by-date?date=${formatted}`)
      .subscribe({
        next: (orders) => {
          // Reset all slots to free true first
          this.timeSlots.forEach(slot => slot.free = true);

          const result = orders.map(order => ({
            time: order.time.slice(0, 5),
            duration: order.service.duration
          }));

          result.forEach(({ time, duration }) => {
            let minutesLeft = duration;
            let currentTime = time;

            while (minutesLeft > 0) {
              const slot = this.timeSlots.find(slot => slot.time === currentTime);
              if (slot) {
                slot.free = false;
              }

              const [h, m] = currentTime.split(":").map(Number);
              const newMinutes = m + 30;
              const newHour = h + Math.floor(newMinutes / 60);
              const finalMinutes = newMinutes % 60;
              currentTime = `${newHour.toString().padStart(2, "0")}:${finalMinutes.toString().padStart(2, "0")}`;

              minutesLeft -= 30;
            }
          });

          this.cdr.markForCheck();  // << Add this line

          console.log('Available time slots:', this.timeSlots);
        },
        error: (err) => {
          console.error('Failed to fetch orders', err);
        }
      });
  }

  confirm() {
    if (localStorage.getItem('currentUser') === null) {
      this.MatSnackBar.open('Please log in to book a service.', 'Close', { duration: 3000 });
      return;
    }

    if (this.selectedTime === null) {
      this.MatSnackBar.open('Please select a time and date.', 'Close', { duration: 3000 });
      return;
    }

    const id1 = localStorage.getItem('id');
    const year = this.selected.getFullYear();
    const month = String(this.selected.getMonth() + 1).padStart(2, '0');
    const day = String(this.selected.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    this.http.post('http://localhost:3000/orders', {
      userId: Number(id1),
      serviceId: Number(this.id),
      date: formattedDate,
      time: this.selectedTime,
      status: 'pending'
    }).subscribe({
      next: (res) => {
        this.router.navigate(['/booking'], {
          queryParams: {
            name: this.name,
            dur: this.duration,
            date: formattedDate,
            time: this.selectedTime
          }
        });
      },
      error: (err) => {
        this.snackBar.open('Registration failed! Try again.', 'Close', {
          duration: 3000,
          panelClass: ['bg-red-600', 'text-white'],
        });
      }
    });
  }
}
