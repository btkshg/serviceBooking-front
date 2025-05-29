import { Component } from '@angular/core';
import { HeaderComponent } from '../../app/components/header/header.component';
import { FooterComponent } from '../../app/components/footer/footer.component';


@Component({
    selector: 'service-page',
    templateUrl: './service.page.html',
    imports: [HeaderComponent, FooterComponent]
})
export class servicePage {
}
