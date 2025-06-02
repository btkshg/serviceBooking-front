import { Component, Input, Output, EventEmitter } from '@angular/core';

// This component used to display services in current database
@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  standalone: true,
})
// In @input we pass the service data from the parent component. Defining the type of the service card object.
export class ServiceCardComponent {
  @Input() card!: {
    id: number;
    name: string;
    description: string;
    picUrl?: string;
    duration: number;
    price: number;
  };

  // @output emits a service card object to the parent component. To send service data through router.
  @Output() cardClick = new EventEmitter<object>();

  // Called when the card is clicked.
  emitClick() {
    this.cardClick.emit(this.card);
  }
}
