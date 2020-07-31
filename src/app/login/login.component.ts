import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.authUser.subscribe(status => this.isLoading = false)
  }

  onLogin(form: NgForm) {
    if (form.invalid) 
      return;
    this.isLoading = true;
    this.authService.login(form.value.email, form.value.password);
  }

}
