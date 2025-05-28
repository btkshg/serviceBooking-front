import { Component } from '@angular/core';
import { NavigationComponent } from '../../app/components/navigation/navigation.component';


@Component({
    selector: 'home-page',
    templateUrl: './home.page.html',
    imports: [NavigationComponent]
})
export class HomePage {
}