import { Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { ChangeDetectionStrategy, model} from '@angular/core';
import { MatCardModule} from '@angular/material/card';
import { provideNativeDateAdapter} from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'service-page',
    templateUrl: './service.page.html',
    standalone: true,
    providers: [provideNativeDateAdapter()],
    imports: [CommonModule, FormsModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, MatCardModule, MatDatepickerModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class servicePage {
    timeSlots: string[] = [];
    selectedTime: string | null = null;
    selected: Date = new Date();
    minDate: Date = new Date(); 
    id: null | number = null;
    name: null | string = null; 
    duration: null | string = null;

    ngOnInit() {
      const startHour = 10;
      const endHour = 18;
      for (let hour = startHour; hour < endHour; hour++) {
        this.timeSlots.push(`${hour}:00`, `${hour}:30`);
      }
      this.route.queryParams.subscribe(params => {
        this.id = params['id'];
        this.name = params['name'];
        this.duration = params['dur'];
      });
    }

    selectTime(time: string) {
        this.selectedTime = this.selectedTime === time ? null : time;
    }

    constructor(private route: ActivatedRoute ,private router: Router, private MatSnackBar: MatSnackBar) {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          window.scrollTo(0, 0);
        }
      });
    }

    confirm() {
      const role = localStorage.getItem('currentUser');
      console.log(role);
      if(localStorage.getItem('currentUser') === null) {
        this.MatSnackBar.open('Please log in to book a service.', 'Close', {
          duration: 3000,});
        return;
      }
      if (this.selectedTime === null) {
        this.MatSnackBar.open('Please select a time and date.', 'Close', {
          duration: 3000,
        });
        return;
      }
      this.router.navigate(['/booking'], {queryParams: {name: this.name, dur: this.duration, date: this.selected, time: this.selectedTime}});
    }
}


