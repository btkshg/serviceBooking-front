import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // <-- add this
import { CommonModule } from '@angular/common';
import { ServiceCardComponent } from '../../app/components/service-card/service-card.component';
import { Router } from '@angular/router';

// Landing page of the app.
@Component({
  selector: 'home-page',
  templateUrl: './home.page.html',
  standalone: true,
  imports: [CommonModule, ServiceCardComponent],
})
export class HomePage implements OnInit {
  // Initializing array to store service cards data
  cards: any[] = [];
  // Init user role due to when card is clicked it directs to other page based on user role 
  user: string = 'guest'; 

  // Dummy data for reviews
  reviews = [
    { name: 'Bata', text: 'Nice garage!', rating: 4.9 },
    { name: 'Dan', text: 'Friendly staff.', rating: 4.5 },
    { name: 'Phithak', text: 'Will come again!', rating: 4.8 },
    { name: 'Bence', text: "I'm the best", rating: 5 },
    { name: 'Aki', text: 'Great service!', rating: 4.7 },
  ];
  repeatedReviews = [...this.reviews, ...this.reviews];

  constructor(private router: Router, private http: HttpClient) {}

  // When initialized, it fetches the services list from backend.
  ngOnInit() {
    this.http.get<any[]>('http://localhost:3000/services').subscribe((data) => {
      this.cards = data;
    });
    console.log('HomePage initialized');
  }

  // When card clicked, if it's user, it directs to further booking, if it's admin, it directs to add/edit service page.
  goToPage(card: any) {
    const role = localStorage.getItem('currentUser');
    console.log('Navigating to service with id:', card.id, role);
    localStorage.getItem('currentUser') === 'admin'
      ? this.router.navigate(['/add', card.id]) 
      : this.router.navigate(['/service'], { queryParams: {id: card.id, name: card.name, dur: card.duration }});
  }
}
