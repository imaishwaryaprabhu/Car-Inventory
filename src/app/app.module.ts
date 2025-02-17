import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { CarsComponent } from './cars/cars.component';
import { CarGridComponent } from './cars/car-grid/car-grid.component';
import { CarDetailCardComponent } from './cars/car-detail-card/car-detail-card.component';
import { ModalCategoriesComponent } from './cars/modal-categories/modal-categories.component';
import { AdminModalsComponent } from './admin/admin-modals/admin-modals.component';
import { AdminModalEditComponent } from './admin/admin-modals/admin-modal-edit/admin-modal-edit.component';
import { AdminCarsComponent } from './admin/admin-cars/admin-cars.component';
import { AdminCarEditComponent } from './admin/admin-car-edit/admin-car-edit.component';
import { AuthInterceptor } from './services/auth-interceptor';
import { ErrorInterceptor } from './services/error-interceptor';
import { ToastAlertComponent } from './shared/toast-alert/toast-alert.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    CarsComponent,
    CarGridComponent,
    CarDetailCardComponent,
    ModalCategoriesComponent,
    AdminModalsComponent,
    AdminModalEditComponent,
    AdminCarsComponent,
    AdminCarEditComponent,
    ToastAlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
