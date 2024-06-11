import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private loggedInUsernameKey = 'loggedInUsername';
  private loggedInUsernameKey1 = 'loggedInUsername1';
  private cartUpdateSubject = new BehaviorSubject<boolean>(false);

  constructor() {}

  setLoggedInUsername(username: string) {
    localStorage.setItem(this.loggedInUsernameKey, username);
  }

  setLoggedInUsername1(email: string) {
    localStorage.setItem(this.loggedInUsernameKey1, email);
  }

  getLoggedInUsername() {
    return localStorage.getItem(this.loggedInUsernameKey);
  }

  getLoggedInUsername1() {
    return localStorage.getItem(this.loggedInUsernameKey1);
  }

  clearLoggedInUsername() {
    localStorage.removeItem(this.loggedInUsernameKey);
  }

  clearLoggedInUsername1() {
    localStorage.removeItem(this.loggedInUsernameKey1);
  }

  notifyCartUpdate() {
    this.cartUpdateSubject.next(true);
  }

  subscribeToCartUpdates() {
    return this.cartUpdateSubject.asObservable();
  }
}
