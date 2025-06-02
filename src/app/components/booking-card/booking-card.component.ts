import { Component, Input, Output, EventEmitter } from '@angular/core';

// This component created to display certain user's booking card with details. 
// It's a independant component that booking datas passed from the parent.
@Component({
  selector: 'app-booking-card',
  imports: [],
  templateUrl: './booking-card.component.html',
  styleUrl: './booking-card.component.css'
})
// In @input we pass the booking data from the parent component.
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

  // Output emits a booking id to the parent component when the delete button is pressed.
  @Output() cardClick = new EventEmitter<number>();

  // This method is called when the delete button is clicked.
  delete(){
    this.cardClick.emit(this.booking.id);
    // console.log('workign')
  }
}
