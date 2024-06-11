import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // constructor( private http: HttpClient ) { }
  http = inject(HttpClient);

  private url = 'http://localhost:5000/auth/';

  registerUser( user: any) {
    return this.http.post(this.url + 'register-user', user)
  }

  registerStylist( stylist: any) {
    return this.http.post(this.url + 'register-stylist', stylist)
  }

  login(user: any) {
    return this.http.post<any>(this.url + 'login', user);
  }
}
