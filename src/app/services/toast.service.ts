import { Injectable } from '@angular/core';

@Injectable({ 
  providedIn: 'root' 
})

export class ToastService {
  toasts: any[] = [];

  showStandard(textOrTpl: string) {
    this.toasts.push({ textOrTpl, classname: 'bg-success text-light' });
  }

  showSuccess(textOrTpl: string) {
    this.toasts.push({ textOrTpl, classname: 'bg-success text-light' });
  }

  showError(textOrTpl: string) {
    this.toasts.push({ textOrTpl, classname: 'bg-danger text-light' });
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
