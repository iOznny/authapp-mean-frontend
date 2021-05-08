import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthResponse } from '../interfaces/auth.interface';

import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})

export class LoginComponent implements OnInit {

  public form!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.createForm();
  }

  public createForm() {
    this.form = this.fb.group({
      'email': ['demo@mean.com', [Validators.required, Validators.email]],
      'password': ['123456', [Validators.required, Validators.minLength(6)]]
    });
  }

  public login() {
    const { email, password } = this.form.value;

    this.authService.login(email, password).subscribe(
      (valid) => {       
        if(valid === true) {        
          this.router.navigateByUrl('/dashboard');
        } else {
          Swal.fire('Error', valid, 'error');
        }
      }
    );
  }

}
