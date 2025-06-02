import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// Page for registering and loggin users only.
@Component({
    selector: 'registerLogin-page',
    templateUrl: './registerLogin.page.html',
    imports: [FormsModule, MatSnackBarModule]
})
export class RegisterLoginPage {
    // Set the input values to empty strings
    name = '';
    email = '';
    password = '';

    loginName = '';
    loginPass = '';

    constructor(private http: HttpClient, private router: Router, private authService: AuthService, private snackBar : MatSnackBar) {}
    
    // When user filled out the registering form and pressed register button, it sends the data to backend to create a new user
    // If fails snackbar will be shown.
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

    // When user filled out the login form and pressed login button, it sends the data to backend to log in the user
    // If fails snackbar will be shown.
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
