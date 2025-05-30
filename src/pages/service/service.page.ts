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
    selected: Date | null = null;
    minDate: Date = new Date(); 

    ngOnInit() {
      const startHour = 10;
      const endHour = 18;
      for (let hour = startHour; hour < endHour; hour++) {
        this.timeSlots.push(`${hour}:00`, `${hour}:30`);
      }
    }

    selectTime(time: string) {
        this.selectedTime = this.selectedTime === time ? null : time;
    }

    constructor(private router: Router) {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          window.scrollTo(0, 0);
        }
      });
    }

    confirm() {
      this.router.navigate(['/booking']);
    }
}


