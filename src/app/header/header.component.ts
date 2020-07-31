import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../modals/user.modal';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated = false;
  authUserSub: Subscription;
  user: User;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authUserSub = this.authService.authUser.subscribe((user: User) => {
      this.isAuthenticated = !!user;
      this.user = user;
    });
  }

  onLogout() {
    this.authService.logout();
  }

}
