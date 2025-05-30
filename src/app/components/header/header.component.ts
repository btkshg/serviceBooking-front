import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'compHeader',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  role: 'guest' | 'user' | 'admin' = 'guest';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.userRole$.subscribe(role => {
      this.role = role;
    });
  }

  goHome() {
    this.router.navigate(['/']);
  }

  goAddService() {
    this.router.navigate(['/add'])
  }

  goRegisterLogin() {
    this.router.navigate(['/login'])
  }

  goProfile() {
    this.router.navigate(['/profile'])
  }

  logout() {
    this.authService.setRole('guest');
    this.router.navigate(['/']);
  }
}