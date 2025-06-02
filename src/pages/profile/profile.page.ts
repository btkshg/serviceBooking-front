import { Component, OnInit } from '@angular/core';
import { BookingCardComponent } from '../../app/components/booking-card/booking-card.component';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'profile-page',
    templateUrl: './profile.page.html',
    imports: [BookingCardComponent, CommonModule]
})
export class profilePage implements OnInit {

    currentName: string = '';
    currentEmail: string = '';
    id: string = '';
    bookings: any[] = []; 

    constructor(private authService: AuthService, private http: HttpClient ) {}

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

    deleteBooking(id: number) {
       this.http.delete(`http://localhost:3000/orders/${id}`).subscribe({
            next: (res) => {
                console.log('Booking deleted:', res);
                this.bookings = this.bookings.filter(booking => booking.id !== id);
            }    
      })}
}