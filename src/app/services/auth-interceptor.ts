import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = this.authService.getToken();
        if (token) {
            let modifiedRequest = req.clone({
                headers: new HttpHeaders().set('Authorization', token)
            })
            return next.handle(modifiedRequest);
        }
        return next.handle(req);
    }
}