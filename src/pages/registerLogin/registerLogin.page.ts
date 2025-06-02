import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
    selector: 'registerLogin-page',
    templateUrl: './registerLogin.page.html',
    imports: [FormsModule, MatSnackBarModule]
})
export class RegisterLoginPage {
    name = '';
    email = '';
    password = '';

    loginName = '';
    loginPass = '';

    constructor(private http: HttpClient, private router: Router, private authService: AuthService, private snackBar : MatSnackBar) {}

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
                this.snackBar.open('User registered successfully! Please login!', 'Close', {
                    duration: 3000,
                    panelClass: ['bg-red-600', 'text-white'],
                });
                this.email = '';
                this.name = ''; 
                this.password = '';
            },
            
            error: (err) => {
                console.error('Registration failed:', err.error);
                this.snackBar.open('Registration failed! Try again.', 'Close', {
                    duration: 3000,
                    panelClass: ['bg-red-600', 'text-white'],
                });
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
                this.authService.setRole(res.user.role);
                this.authService.setName(res.user.name);
                this.authService.setEmail(res.user.email);
                this.authService.setId(res.user.id);
                localStorage.setItem('token', res.access_token);
                this.snackBar.open('Login successful!', 'Close', {
                    duration: 3000,
                    panelClass: ['bg-red-600', 'text-white'],
                });
                this.router.navigate(['/']);
            },
            error: (err) => {
            console.error('Login failed:', err.error);
            this.snackBar.open('Login failed! Try again.', 'Close', {
                duration: 3000,
                panelClass: ['bg-red-600', 'text-white'],
            });
            }
        });
    }
}
