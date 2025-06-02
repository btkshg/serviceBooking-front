import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// This service is used to manage the authentication state of the user.
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Role state, set default to 'guest' while making it subscribable
  private currentRoleSubject = new BehaviorSubject<string>('guest');
  currentRole$ = this.currentRoleSubject.asObservable();

  // Name state, set default to empty string while making it subscribable
  private currentNameSubject = new BehaviorSubject<string>('');
  currentName$ = this.currentNameSubject.asObservable();

  // Id state, set default to empty string while making it subscribable
  private currentIdSubject = new BehaviorSubject<string>('');
  currentId$ = this.currentIdSubject.asObservable();

  // Email state, set default to empty string while making it subscribable
  private currentEmailSubject = new BehaviorSubject<string>('');
  currentEmail$ = this.currentEmailSubject.asObservable();

  // when initialized, chekcs localStorage
  constructor() {

    // if found role, then change currentRoleSubject which in turn changes every other component subscribed to it
    const role = localStorage.getItem('currentUser');
    if (role) {
      this.currentRoleSubject.next(role);
    }

    // if found name, then change currentNameSubject which in turn changes every other component subscribed to it
    const name = localStorage.getItem('currentName');
    if (name) {
      this.currentNameSubject.next(name);
    }

    // if found email, then change currentEmailSubject which in turn changes every other component subscribed to it
    const email = localStorage.getItem('currentEmail');
    if (email) {
      this.currentEmailSubject.next(email);
    }

    // if found id, then change currentIdSubject which in turn changes every other component subscribed to it
    const id = localStorage.getItem('id');
    if (id) {
      this.currentIdSubject.next(id);
    }
  }

  // set the account role to the localStorage, with the data gotten from the backend
  setRole(role: string) {
    localStorage.setItem('currentUser', role);
    this.currentRoleSubject.next(role);
  }

  // set the account name to the localStorage, with the data gotten from the backend
  setName(name: string) {
    localStorage.setItem('currentName', name);
    this.currentNameSubject.next(name);
  }

  // set the account name to the localStorage, with the data gotten from the backend
  setId(id: string) {
    localStorage.setItem('id', id);
    this.currentIdSubject.next(id);   
  }

  // remove currentUser from the localStorage while changing the Role state to 'guest'
  logout() {
    localStorage.removeItem('currentUser');
    this.currentRoleSubject.next('guest');
  }

  // set the account name to the localStorage, with the data gotten from the backend
  setEmail(email: string) {
    localStorage.setItem('currentEmail', email);
    this.currentEmailSubject.next(email);
  }
}
