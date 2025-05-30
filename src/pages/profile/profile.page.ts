import { Component } from '@angular/core';
import { HeaderComponent } from '../../app/components/header/header.component';
import { FooterComponent } from '../../app/components/footer/footer.component';
import { BookingCardComponent } from '../../app/components/booking-card/booking-card.component';


@Component({
    selector: 'profile-page',
    templateUrl: './profile.page.html',
    imports: [BookingCardComponent]
})
export class profilePage {
}