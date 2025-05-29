import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  standalone: true,
})
export class ServiceCardComponent {
  @Input() card!: {
    title: string;
    description: string;
    image?: string;
    duration: number;
    price: number;
  };
}
