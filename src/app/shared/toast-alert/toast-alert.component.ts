import { Component } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'toast-alert',
  template: `
    <ngb-toast
      *ngFor="let toast of toastService.toasts"
      [class]="toast.classname"
      [autohide]="true"
      [delay]="2000"
      (hide)="toastService.remove(toast)"
    >
     {{ toast.textOrTpl }}
    </ngb-toast>
  `,
  host: {'[class.ngb-toasts]': 'true'}
})

export class ToastAlertComponent {
  constructor(public toastService: ToastService) {}
}
