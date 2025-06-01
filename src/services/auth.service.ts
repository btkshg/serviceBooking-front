import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentRoleSubject = new BehaviorSubject<string>('guest');
  currentRole$ = this.currentRoleSubject.asObservable();

  private currentNameSubject = new BehaviorSubject<string>('');
  currentName$ = this.currentNameSubject.asObservable();

  constructor() {
    const role = localStorage.getItem('currentUser');
    if (role) {
      this.currentRoleSubject.next(role);
    }

    const name = localStorage.getItem('currentName');
    if (name) {
      this.currentNameSubject.next(name);
    }
  }

  setRole(role: string) {
    localStorage.setItem('currentUser', role);
    this.currentRoleSubject.next(role);
  }

  setName(name: string) {
    localStorage.setItem('currentName', name);
    this.currentNameSubject.next(name);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentRoleSubject.next('guest');
  }
}
