import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CarsComponent } from './cars/cars.component';
import { CarGridComponent } from './cars/car-grid/car-grid.component';
import { CarDetailCardComponent } from './cars/car-detail-card/car-detail-card.component';
import { AdminModalsComponent } from './admin/admin-modals/admin-modals.component';
import { AdminCarsComponent } from './admin/admin-cars/admin-cars.component';
import { AdminCarEditComponent } from './admin/admin-car-edit/admin-car-edit.component';

const routes: Routes = [
    { path: '', redirectTo: '/cars', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'cars', component: CarsComponent, children: [
        { path: '', component: CarGridComponent },
        { path: ':id', component: CarDetailCardComponent }
    ]},
    { path: 'admin/models', component: AdminModalsComponent },
    { path: 'admin/cars/new', component: AdminCarEditComponent },
    { path: 'admin/cars/:id/edit', component: AdminCarEditComponent },
    { path: 'admin/cars', component: AdminCarsComponent}
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