import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-side-login',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './side-login.component.html',
  styleUrls: ['./side-login.component.scss'],
})
export class AppSideLoginComponent {

  loginform: FormGroup;
  passwordError: string = '';
  invalidError: string = '';

  constructor(private router: Router, private fb: FormBuilder,private cdr: ChangeDetectorRef,private authService:AuthService) { }

  ngOnInit(): void {
    this.loginFormInitilization();
  }


  loginFormInitilization() {
    this.loginform = this.fb.group({
      uname: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/),
      ]),
    });

    this.loginform.get('password')?.valueChanges.subscribe((value) => {
      this.validatePassword(value);
    });
  }
  validatePassword(value: string) {
    if (value.length < 8) {
      this.passwordError = 'Password must be at least 8 characters long.';
    } else if (!/[A-Z]/.test(value)) {
      this.passwordError = 'Password must contain at least one uppercase letter.';
    } else if (!/[0-9]/.test(value)) {
      this.passwordError = 'Password must contain at least one number.';
    } else if (!/[@$!%*?&]/.test(value)) {
      this.passwordError = 'Password must contain at least one special character.';
    } else {
      this.passwordError = ''; // No error
    }
  }


  submit() {
    if (this.loginform.invalid) {
      this.loginform.markAllAsTouched();
      return;
    }

    const email = this.loginform.get('uname')?.value;
    const password = this.loginform.get('password')?.value;
    this.invalidError = '';

    this.authService.proceedLogin(email, password).subscribe(
      response => {
        if (response?.success) {
          console.log('Login successful:', response);
          localStorage.setItem('token', response.token);
          this.router.navigate(['/app/dashboard']);
        } else {
          console.warn('Login failed:', response);
          this.invalidError = response.message || 'Invalid username or password.';
        }
      },
      error => {
        console.error('Login error:', error);
        this.invalidError = 'Something went wrong. Please try again later.';
      }
    );
  }


}
