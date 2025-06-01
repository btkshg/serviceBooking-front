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
export class HeaderComponent implements OnInit{

  constructor(private router: Router, private authService: AuthService) {}

  currentUser: string = 'guest';

  currentName: string = '';

  ngOnInit() {
    this.authService.currentRole$.subscribe(role => {
      this.currentUser = role;
      console.log('Header: currentUser set to', role);
    });
    console.log('current user: ', this.currentUser) 
    
    this.authService.currentName$.subscribe(name => {
      this.currentName = name;
      console.log('Header: currentName set to', name);
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
    this.authService.logout();
    this.router.navigate(['/'])
  }

}