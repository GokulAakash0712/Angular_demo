import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterCompComponent } from '../register-comp/register-comp.component';
import { ForgotPasswordCompComponent } from '../forgot-password-comp/forgot-password-comp.component';
import { ModalService } from '../../Services/modal.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-login-comp',
  templateUrl: './login-comp.component.html',
  styleUrls: ['./login-comp.component.scss'],
})
export class LoginCompComponent {
  @Output() loginEvent = new EventEmitter<void>();
  loginForm!: FormGroup;
  submitted: boolean = false;
  loginError: string = '';

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private modalServices: ModalService,
    private http: HttpClient,
    private userService: UserService
  ) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z].*$/)]],
      password: ['', Validators.required],
    });
  }

  login() {
    this.submitted = true;

    if (this.loginForm.valid) {
      const enteredUsername = this.loginForm.value.username;
      const enteredPassword = this.loginForm.value.password;

      this.http
        .get<any>('http://localhost:3000/register')
        .subscribe((users) => {
          const foundUser = users.find(
            (user: any) =>
              user.name === enteredUsername && user.pword === enteredPassword
          );
          if (foundUser) {
            this.userService.setLoggedInUsername(foundUser.name);
            this.loginEvent.emit();
            this.activeModal.close();
          } else {
            this.loginError = 'Invalid username or password. Please try again.';
          }
        });
    }
  }

  openRegisterModal(event: Event) {
    event.preventDefault();
    this.activeModal.dismiss();
    const modalRef = this.modalServices.open(RegisterCompComponent, {
      centered: true,
    });
  }

  closeModal() {
    this.activeModal.dismiss('Cross button clicked');
  }

  openForgotPasswordModal(event: Event) {
    event.preventDefault();
    this.activeModal.dismiss();
    const modalRef = this.modalService.open(ForgotPasswordCompComponent, {
      centered: true,
    });
  }
}
