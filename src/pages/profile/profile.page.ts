import { Component, OnInit } from '@angular/core';
import { BookingCardComponent } from '../../app/components/booking-card/booking-card.component';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

// Profile component is for displaying user's data and their bookings.
@Component({
    selector: 'profile-page',
    templateUrl: './profile.page.html',
    imports: [BookingCardComponent, CommonModule]
})
export class profilePage implements OnInit {
    // Until user is not signed in, these variables are empty.
    currentName: string = '';
    currentEmail: string = '';
    id: string = '';
    // Init user's booking array.
    bookings: any[] = []; 

    constructor(private authService: AuthService, private http: HttpClient ) {}
    
    // Sets user variables from localstorage authService and fetches user's bookings from backend.
    ngOnInit() {
        this.authService.currentName$.subscribe(name => {
            this.currentName = name;
        })

        this.authService.currentEmail$.subscribe(email => {
            this.currentEmail = email;
        })

        this.authService.currentId$.subscribe(id => {
            this.id = id.toString();
        
            this.http.get<any[]>(`http://localhost:3000/orders/user/${this.id}`).subscribe((data) => {
                this.bookings = data.reverse();
                console.log('Orders fetched:', this.bookings);
            });
        });
    }

    // WHen user want to cancel/delete their booking.
    deleteBooking(id: number) {
       this.http.delete(`http://localhost:3000/orders/${id}`).subscribe({
            next: (res) => {
                console.log('Booking deleted:', res);
                this.bookings = this.bookings.filter(booking => booking.id !== id);
            }    
      })}
}