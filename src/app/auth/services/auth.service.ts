import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../pages/interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private url = environment.url;
  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    const body = { email, password };
    return this.http.post<AuthResponse>(`${ this.url }/auth`, body);
  }
}
