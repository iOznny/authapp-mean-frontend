import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})

export class RegisterComponent implements OnInit {

  public form!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { }

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
    this.router.navigateByUrl('/dashboard');
  }

}
