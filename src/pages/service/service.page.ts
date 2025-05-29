import { Component } from '@angular/core';
import { HeaderComponent } from '../../app/components/header/header.component';
import { FooterComponent } from '../../app/components/footer/footer.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { ChangeDetectionStrategy, model} from '@angular/core';
import { MatCardModule} from '@angular/material/card';
import { provideNativeDateAdapter} from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'service-page',
    templateUrl: './service.page.html',
    standalone: true,
    providers: [provideNativeDateAdapter()],
    imports: [CommonModule, HeaderComponent, FooterComponent, FormsModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, MatCardModule, MatDatepickerModule],
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

    constructor(private router: Router) {}

    confirm() {
      this.router.navigate(['/booking']);
    }
}


