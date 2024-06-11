import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthSharedService {
  private loggedIn: boolean = false;
  private readonly storageKey: string = 'loggedIn';
  loggedInChanged = new Subject<boolean>();

  constructor() {
    this.loggedIn = !!localStorage.getItem(this.storageKey);
  }
  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  login(): void {
    this.loggedIn = true;
    localStorage.setItem(this.storageKey, 'true');
    this.loggedInChanged.next(true);
  }

  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem(this.storageKey);
    this.loggedInChanged.next(false);
  }
}
