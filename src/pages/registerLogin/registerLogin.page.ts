import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'registerLogin-page',
    templateUrl: './registerLogin.page.html',
    imports: [FormsModule]
})
export class RegisterLoginPage {
    username = '';
    password = '';
    error = '';

    constructor(private router: Router, private authService: AuthService) {}

    login() {
        if (this.username === 'user' && this.password === 'user') {
        this.authService.setRole('user');
        this.router.navigate(['/']);
        } else if (this.username === 'login' && this.password === 'login') {
        this.authService.setRole('admin');
        this.router.navigate(['/']);
        } else {
        this.error = 'Invalid credentials';
        }
    }
}