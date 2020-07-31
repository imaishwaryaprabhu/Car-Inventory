import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CarsComponent } from './cars/cars.component';
import { CarGridComponent } from './cars/car-grid/car-grid.component';
import { CarDetailCardComponent } from './cars/car-detail-card/car-detail-card.component';
import { AdminModalsComponent } from './admin/admin-modals/admin-modals.component';
import { AdminCarsComponent } from './admin/admin-cars/admin-cars.component';
import { AdminCarEditComponent } from './admin/admin-car-edit/admin-car-edit.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
    { path: '', redirectTo: '/cars', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'cars', component: CarsComponent, children: [
        { path: '', component: CarGridComponent },
        { path: ':id', component: CarDetailCardComponent }
    ]},
    { path: 'admin/models', canActivate: [AuthGuardService],  component: AdminModalsComponent },
    { path: 'admin/cars/new', canActivate: [AuthGuardService], component: AdminCarEditComponent },
    { path: 'admin/cars/:id/edit', canActivate: [AuthGuardService], component: AdminCarEditComponent },
    { path: 'admin/cars', canActivate: [AuthGuardService], component: AdminCarsComponent},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {
}