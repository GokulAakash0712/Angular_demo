// forgot-password-comp.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-forgot-password-comp',
  templateUrl: './forgot-password-comp.component.html',
  styleUrls: ['./forgot-password-comp.component.scss'],
})
export class ForgotPasswordCompComponent {
  @Output() resetPasswordEvent = new EventEmitter<void>();
  forgotPasswordForm!: FormGroup;
  submitted: boolean = false;
  resetSuccess: boolean = false;

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal) {
    this.createForm();
  }

  createForm() {
    this.forgotPasswordForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          ),
        ],
      ],
    });
  }

  resetPassword() {
    this.submitted = true;

    if (this.forgotPasswordForm.valid) {
      this.resetSuccess = true;

      this.forgotPasswordForm.reset();

      setTimeout(() => {
        this.activeModal.close('Password reset successful');
      }, 2000);
    }
  }

  shouldDisplayError(controlName: string, errorType: string): boolean {
    const control = this.forgotPasswordForm.get(controlName);

    if (this.resetSuccess) {
      return false;
    }

    if (control && control.hasError('pattern')) {
      return control.errors?.['pattern'];
    }

    return control ? control.hasError(errorType) : false;
  }

  closeModal() {
    this.activeModal.dismiss('Cross button clicked');
  }
}
