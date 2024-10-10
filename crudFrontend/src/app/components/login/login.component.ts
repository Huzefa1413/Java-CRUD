import { Component, OnInit } from '@angular/core';
import { JwtService } from '../../service/jwt.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // Corrected from styleUrl to styleUrls
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | undefined;
  errorMessage: string | undefined; // For displaying errors

  constructor(
    private service: JwtService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Corrected validators
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm?.invalid) {
      this.errorMessage = 'Please fill in all required fields correctly.';
      return;
    }

    this.service.login(this.loginForm?.value).subscribe(
      (response) => {
        console.log(response);
        // Here you would typically store the JWT token and navigate
        // For example:
        // localStorage.setItem('token', response);
        // this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Login failed', error);
        this.errorMessage = 'Login failed. Please check your credentials.';
      }
    );
  }
}
