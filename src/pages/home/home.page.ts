import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // <-- add this
import { CommonModule } from '@angular/common';
import { ServiceCardComponent } from '../../app/components/service-card/service-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'home-page',
  templateUrl: './home.page.html',
  standalone: true,
  imports: [CommonModule, ServiceCardComponent],
})
export class HomePage implements OnInit {
  cards: any[] = [];

  reviews = [
    { name: 'Bata', text: 'Nice garage!', rating: 4.9 },
    { name: 'Dan', text: 'Friendly staff.', rating: 4.5 },
    { name: 'Phithak', text: 'Will come again!', rating: 4.8 },
    { name: 'Bence', text: "I'm the best", rating: 5 },
    { name: 'Aki', text: 'Great service!', rating: 4.7 },
  ];
  repeatedReviews = [...this.reviews, ...this.reviews];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:3000/services').subscribe((data) => {
      this.cards = data;
    });
    console.log('HomePage initialized');
  }

  goToPage() {
    this.router.navigate(['/service']);
  }

  editService(id: number) {
    this.router.navigate(['/add', id]);
  }
}
