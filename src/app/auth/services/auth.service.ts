import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponse, User } from '../pages/interfaces/auth.interface';
import { catchError, map, tap } from "rxjs/operators";
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private url = environment.url;
  private _user!: User;

  get user() {
    return {...this._user};
  }

  constructor(private http: HttpClient) { }

  register(username: string, email: string, password: string) {
    const body = { username, email, password };
    return this.http.post<AuthResponse>(`${ this.url }/auth/new`, body)
    .pipe(
      tap(resp => {
        if(resp.status) {
          localStorage.setItem('token', resp.token!);
        }
      }),
      map(resp => resp.status),
      catchError(err => of(err.error.message))
    );
  }

  login(email: string, password: string) {
    const body = { email, password };
    return this.http.post<AuthResponse>(`${ this.url }/auth`, body)
    .pipe(
      tap(resp => {
        if(resp.status) {
          localStorage.setItem('token', resp.token!);
        }
      }),
      map(resp => resp.status),
      catchError(err => of(err.error.message))
    );
  }

  validToken(): Observable<boolean> {
    const headers = new HttpHeaders()
    .set('x-token', localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>(`${ this.url }/auth/renew`, { headers })
    .pipe(
      map(resp => {
        localStorage.setItem('token', resp.token!);
        this._user = {
          uid: resp.uid!,
          username: resp.username!,
          email: resp.email!
        }

        return resp.status;
      }),
      catchError(err => of(false))
    );
  }

  logout() {
    localStorage.clear();
  }

}