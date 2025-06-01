import { Component, OnInit } from '@angular/core';
import { BookingCardComponent } from '../../app/components/booking-card/booking-card.component';
import { AuthService } from '../../services/auth.service';


@Component({
    selector: 'profile-page',
    templateUrl: './profile.page.html',
    imports: [BookingCardComponent]
})
export class profilePage implements OnInit {

    currentName: string = '';
    currentEmail: string = '';

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.authService.currentName$.subscribe(name => {
            this.currentName = name;
        })

        this.authService.currentEmail$.subscribe(email => {
            this.currentEmail = email;
        })
    }

}