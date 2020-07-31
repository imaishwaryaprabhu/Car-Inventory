import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from '../modals/user.modal';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const BACKEND_PATH = environment.backendURL + '/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  authUser = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return this.token;
  }

  login(email: string, password: string) {
    this.http.post(
      BACKEND_PATH + "/login",
      {
        email: email,
        password: password
      }
    ).subscribe((response: { message: string, token: string, user: any}) => {
      this.token = response['token'];
      const user =new User(response.user.name, response.user.email, response.token);
      this.authUser.next(user);
      localStorage.setItem('userData', JSON.stringify(user));
      this.router.navigate(['/cars']);
    });
  }

  logout() {
    this.authUser.next(null);
    this.token = null;
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }

  autoLogin() {
    const user: User = JSON.parse(localStorage.getItem('userData'));
    if (!user) {
      return;
    }

    if (user.token) {
      this.token = user.token;
      this.authUser.next(user);
    }
  }
}
