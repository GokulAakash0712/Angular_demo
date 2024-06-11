import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthSharedService } from '../../Services/auth-shared.service';
import { LoginCompComponent } from '../login-comp/login-comp.component';
import { UserService } from '../../Services/user.service';
import { Subscription } from 'rxjs';

interface Theatre {
  id: string;
  theatrename: string;
  city: string;
  screen?: string;
  show?: string;
  email?: string;
  password?: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  loggedInUsername: string = '';
  cartVisible: boolean = false;
  bookings: any[] = [];
  cartUpdateSubscription: Subscription | null = null;

  movie: any;
  id: any;
  theatres: Theatre[] = [];
  uniqueCities: string[] = [];
  uniqueTheatres: Theatre[] = [];

  constructor(
    private modalService: NgbModal,
    private route: Router,
    private authService: AuthSharedService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.authService.loggedInChanged.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });

    const username = this.userService.getLoggedInUsername();
    if (username !== null) {
      this.loggedInUsername = username;
      
    }


  }

  ngOnDestroy(): void {
    if (this.cartUpdateSubscription) {
      this.cartUpdateSubscription.unsubscribe();
    }
  }



  openLoginModal() {
    const modalRef = this.modalService.open(LoginCompComponent);
    modalRef.componentInstance.loginEvent.subscribe(() => {
      this.login();
    });
  }

  login() {
    this.authService.login();
    this.isLoggedIn = true;
    this.loggedInUsername = this.userService.getLoggedInUsername() ?? '';


  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.loggedInUsername = '';

    if (this.cartUpdateSubscription) {
      this.cartUpdateSubscription.unsubscribe();
    }
    localStorage.removeItem('isCartSubscribed');
  }

  navigateToNextPage() {
    if (this.isLoggedIn) {
      this.route.navigate(['/next']);
    } else {
      this.openLoginModal();
    }
  }

  showCart() {
    this.cartVisible = true;
  }

  hideCart() {
    this.cartVisible = false;
  }


}
