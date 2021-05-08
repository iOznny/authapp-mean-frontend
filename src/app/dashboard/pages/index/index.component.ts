import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styles: [`
    * {
      margin: 15px;
    }
  `]
})
export class IndexComponent {

  get user() {
    return this.authService.user;
  }

  constructor(private router: Router, private authService: AuthService) { }

  public logout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }
 
}
