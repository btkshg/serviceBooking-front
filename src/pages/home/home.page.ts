import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceCardComponent } from '../../app/components/service-card/service-card.component';
import { Router } from '@angular/router';


@Component({
  selector: 'home-page',
  templateUrl: './home.page.html',
  standalone: true,              
  imports: [CommonModule, ServiceCardComponent],
})
export class HomePage {
    reviews = [
      { name: 'Bata', text: 'Nice garage!', rating: 4.9 },
      { name: 'Dan', text: 'Friendly staff.', rating: 4.5 },
      { name: 'Phithak', text: 'Will come again!', rating: 4.8 },
      { name: 'Bence', text: "I'm the best", rating: 5 },
      { name: 'Aki', text: 'Great service!', rating: 4.7 },
    ];
  
    repeatedReviews = [...this.reviews, ...this.reviews];

    cards = [
        { title: 'Car Wash', description: 'Get your car washed with our premium service.', image: '', duration: 30, price: 20 },
        { title: 'Oil Change', description: 'Keep your engine running smoothly with our oil change service.', image: '', duration: 30, price: 20 },
        { title: 'Tire Rotation', description: 'Extend the life of your tires with our tire rotation service.', image: '', duration: 30, price: 20 },
        { title: 'Brake Inspection', description: 'Ensure your brakes are in top condition with our inspection service.', image: '', duration: 30, price: 20 },
        { title: 'Battery Check', description: 'Keep your battery healthy with our battery check service.', image: '', duration: 30, price: 20 },
    ];

    constructor(private router: Router) {}

  goToPage() {
    this.router.navigate(['/service']);
  }
}