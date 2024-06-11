// register-comp.component.ts
import { HttpClient } from '@angular/common/http';
import { Component, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  PatternValidator,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register-comp',
  templateUrl: './register-comp.component.html',
  styleUrls: ['./register-comp.component.scss'],
})
export class RegisterCompComponent {
  @Output() registerEvent = new EventEmitter<void>();
  registerForm!: FormGroup;
  submitted: boolean = false;
  registrationError: boolean = false;
  registrationSuccess: boolean = false;

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private http: HttpClient
  ) {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group(
      {
        fname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
        lname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
        placeOfBirth: [
          '',
          [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)],
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^[a-zA-Z0-9_]{3,}@[a-zA-Z0-9]{3,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/
            ),
          ],
        ],
        mobile: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
        name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]/)]],
        pword: ['', [Validators.required, Validators.minLength(6)]],
        cpword: ['', Validators.required],
      },
      { validators: this.checkRequired }
    );
  }

  checkRequired(group: FormGroup) {
    const fname = group.get('fname')?.value;
    const lname = group.get('lname')?.value;
    const placeOfBirth = group.get('placeOfBirth')?.value;
    const name = group.get('name')?.value;
    const mobile = group.get('mobile')?.value;
    const email = group.get('email')?.value;
    const pword = group.get('pword')?.value;
    const cpword = group.get('cpword')?.value;

    const errors: { [key: string]: any } = {};

    if (!fname || !/^[a-zA-Z]+$/.test(fname) || fname.trim() === '') {
      errors['fname'] = { required: true, pattern: true };
    }

    if (!lname || !/^[a-zA-Z]+$/.test(lname) || lname.trim() === '') {
      errors['lname'] = { required: true, pattern: true };
    }

    if (
      !placeOfBirth ||
      !/^[a-zA-Z]+$/.test(placeOfBirth) ||
      placeOfBirth.trim() === ''
    ) {
      errors['placeOfBirth'] = { required: true, pattern: true };
    }

    if (!name || !/^[a-zA-Z]/.test(name) || name.trim() === '') {
      errors['name'] = { required: true, pattern: true };
    }

    if (!mobile || !/^[6-9]\d{9}$/.test(mobile) || mobile.trim() === '') {
      errors['mobile'] = { required: true, pattern: true };
    }

    if (
      !email ||
      !/^[a-zA-Z0-9_]{3,}@[a-zA-Z0-9]{3,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/.test(
        email
      ) ||
      email.trim() === ''
    ) {
      errors['email'] = { required: true, pattern: true };
    }

    if (!pword || pword.trim() === '' || pword.length < 6) {
      errors['pword'] = { required: true, minlength: true };
    }

    if (!cpword || cpword.trim() === '') {
      errors['cpword'] = { required: true };
    }

    if (pword !== cpword) {
      errors['passwordMismatch'] = true;
    }

    return Object.keys(errors).length > 0 ? errors : null;
  }

  checkField(fieldName: string): void {
    if (this.submitted) {
      const control = this.registerForm.get(fieldName);
      if (control) {
        control.updateValueAndValidity();
      }
    }
  }

  shouldDisplayError(controlName: string, errorType: string): boolean {
    const control = this.registerForm.get(controlName);

    if (control) {
      if (this.submitted && control.invalid) {
        return control.hasError(errorType);
      }
    }

    return false;
  }

  register() {
    this.submitted = true;

    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      this.http
        .post<any>('http://localhost:3000/register', formData)
        .subscribe((res: any) => {
          console.log('registre success', res);
          this.registrationSuccess = true;
          this.registerEvent.emit();
          setTimeout(() => {
            this.activeModal.close('Registration successful');
            this.registerForm.reset();
          }, 2000);
        });
    } else {
      this.registrationError = true;
      setTimeout(() => {
        this.registrationError = false;
      }, 2000);
    }
  }

  closeModal() {
    this.activeModal.dismiss('Cross button clicked');
  }
}
