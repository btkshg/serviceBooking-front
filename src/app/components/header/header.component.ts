import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

// Header component lists the main navigations checking current user role.
@Component({
  selector: 'compHeader',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  constructor(private router: Router, private authService: AuthService) {}
  // Setting default user role to 'guest'
  currentUser: string = 'guest';
  // When not signed in currentName is empty
  currentName: string = '';

  // When initialized, it sets the current user role and name from the AuthService.
  ngOnInit() {
    this.authService.currentRole$.subscribe(role => {
      this.currentUser = role;
      console.log('Header: currentUser set to', role);
    });
    // console.log('current user: ', this.currentUser) 
    
    this.authService.currentName$.subscribe(name => {
      this.currentName = name;
      // console.log('Header: currentName set to', name);
    });
  }

  // When pressed on app icon, it sends user to the home page.
  goHome() {
    this.router.navigate(['/']);
  }

  // In html this button only visible for admins
  goAddService() {
    this.router.navigate(['/add'])
  }

  // Initial login button.
  goRegisterLogin() {
    this.router.navigate(['/login'])
  }

  // When user is signed it, this button sends user to their profile page.
  goProfile() {
    this.router.navigate(['/profile'])
  }

  // Logs out the user and navigate to home page.
  logout() {
    this.authService.logout();
    this.router.navigate(['/'])
  }

}