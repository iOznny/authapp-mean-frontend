import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit {

  public form!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.createForm();
  }

  public createForm() {
    this.form = this.fb.group({
      'username': ['Demo', [Validators.required]],
      'email': ['demo@mean.com', [Validators.required, Validators.email]],
      'password': ['123456', [Validators.required, Validators.minLength(6)]]
    });
  }

  public register() {
    const { username, email, password } = this.form.value;

    this.authService.register(username, email, password).subscribe(
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