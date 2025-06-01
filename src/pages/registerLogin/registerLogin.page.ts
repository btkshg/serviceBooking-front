import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'registerLogin-page',
    templateUrl: './registerLogin.page.html',
    imports: [FormsModule]
})
export class RegisterLoginPage {
    name = '';
    email = '';
    password = '';

    loginName = '';
    loginPass = '';

    constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

    register() {
        const userData = {
            name: this.name,
            email: this.email,
            password: this.password,
            role: 'user',
        };

        this.http.post('http://localhost:3000/users', userData).subscribe({
            next: (res) => {
                console.log('User registered:', res);
                this.router.navigate(['/']);
            },
            
            error: (err) => {
                console.error('Registration failed:', err.error);
            }
        });
    }

    login() {
        const loginData = {
            name: this.loginName,
            password: this.loginPass,
        };

        this.http.post('http://localhost:3000/auth/login', loginData).subscribe({
            next: (res: any) => {
                console.log('Login Successful:', res);
                this.authService.setRole(res.role);
                this.authService.setName(res.name);
                this.router.navigate(['/']);
            },
            error: (err) => {
            console.error('Login failed:', err.error);
            }
        });
    }
}
