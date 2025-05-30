import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userRoleSubject = new BehaviorSubject<'guest' | 'user' | 'admin'>('guest');
  userRole$ = this.userRoleSubject.asObservable();

  getRole(): 'guest' | 'user' | 'admin' {
    return this.userRoleSubject.value;
  }

  setRole(role: 'guest' | 'user' | 'admin') {
    this.userRoleSubject.next(role);
  }
}
