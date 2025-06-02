import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-booking-card',
  imports: [],
  templateUrl: './booking-card.component.html',
  styleUrl: './booking-card.component.css'
})
export class BookingCardComponent {
  @Input() booking!: {
    id: number;
    date: string;
    time: string;
    duration: number;
    status: string;
    service: {
      name: string;
      price: number;
      duration: number;
    };
  }

  @Output() cardClick = new EventEmitter<number>();

  delete(){
    this.cardClick.emit(this.booking.id);
    console.log('workign')
  }
}
