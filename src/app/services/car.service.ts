import { Injectable } from '@angular/core';
import { Car } from '../modals/car.modal';
import { Modal } from '../modals/modal.modal';
import { HttpClient } from '@angular/common/http';
import { map, tap, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';
import { environment } from '../../environments/environment';

const BACKEND_PATH = environment.backendURL + '/cars';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private cars: Car[] = [];

  constructor(private http: HttpClient, private router: Router, private toastService: ToastService) { }

  getCars(pageSize: number, page: number, modalName: string = "") {
    const queryParams = `?pagesize=${pageSize}&pageno=${page}&modal=${modalName}`;
    return this.http.get<{ message: string, cars: Car[], totalCount: number }>(
      BACKEND_PATH + queryParams
    )
    .pipe(
      tap(response => {
        this.cars = response.cars;
        return response;
      })      
    ); 
  }

  getCarsByModal(modalName: string) {
    const queryParams = `?modal=${modalName}`;
    return this.http.get<{ message: string, cars: Car[], totalCount: number }>(
      BACKEND_PATH + queryParams
    )
    .pipe(
      map(response => {
        return response.cars;
      })      
    ); 
  }

  addCar(newCar: Car) {
    let params = { 
      ...newCar,
      modalId: newCar.modal._id,
      launchDate: Date.parse((new Date(newCar.launchDate.year, newCar.launchDate.month - 1, newCar.launchDate.day)).toISOString())
    };
    delete params.modal;
    this.http.post<{ message: string, car: Car }>(
      BACKEND_PATH,
      { ...params }
    ).subscribe(response => {
      this.toastService.showSuccess("Car has been added");
      this.router.navigate(['/admin/cars']);
    });
  }

  updateCar(carId: string, car: Car) {
    let params = { 
      ...car,
      modalId: car.modal._id,
      launchDate: Date.parse((new Date(car.launchDate.year, car.launchDate.month - 1, car.launchDate.day)).toISOString())
    };
    delete params.modal;
    this.http.put<{ message: string, car: Car }>(
      `${BACKEND_PATH}/${carId}`,
      { ...params }
    ).subscribe(response => {
      this.toastService.showSuccess("Car has been updated");
      this.router.navigate(['/admin/cars']);
    });
  }

  deleteCar(id: string) {
    return this.http.delete<{ message: string, car: any }>(
      `${BACKEND_PATH}/${id}`
    );
  }

  getCar(id: string) {
    return this.http.get<{ message: string, car: any }>(
      `${BACKEND_PATH}/${id}`
    ).pipe(
      take(1), 
      map(response => {
        response.car.launchDate = new Date(response.car.launchDate);
        let launchDate = { "year": response.car.launchDate.getFullYear(), "month": response.car.launchDate.getMonth() + 1, "day": response.car.launchDate.getDate()}
        response.car.launchDate = launchDate;
        return response.car;
      })
    );
  }
}
