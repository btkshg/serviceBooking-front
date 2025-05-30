import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  standalone: true,
})
export class ServiceCardComponent {
  @Input() card!: {
    id: number;
    name: string;
    description: string;
    picUrl?: string;
    duration: number;
    price: number;
  };

  @Output() cardClick = new EventEmitter<void>();
  @Output() imgClick = new EventEmitter<number>();


  emitClick() {
    this.cardClick.emit();
  }

  editService() {
    this.imgClick.emit(this.card.id);
  }
}
