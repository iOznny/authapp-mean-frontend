import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  public logout() {
    this.router.navigateByUrl('/auth');
  }
 
}
