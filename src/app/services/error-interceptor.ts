import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ToastService } from './toast.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

  intercept(req: HttpRequest<any>, next:HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.toastService.showError(error.error.message);
        return throwError(error);
      })
    )
  }

  constructor(private toastService: ToastService) { }

}