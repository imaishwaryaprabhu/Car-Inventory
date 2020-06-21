import { Injectable } from '@angular/core';
import { Car } from '../modals/car.modal';
import { Modal } from '../modals/modal.modal';
import { HttpClient } from '@angular/common/http';
import { map, tap, take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private cars: Car[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  getCars(pageSize: number, page: number, modalName: string = "") {
    const queryParams = `?pagesize=${pageSize}&pageno=${page}&modal=${modalName}`;
    return this.http.get<{ message: string, cars: Car[], totalCount: number }>(
      `http://localhost:5000/api/cars${queryParams}`
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
      `http://localhost:5000/api/cars${queryParams}`
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
      'http://localhost:5000/api/cars',
      { ...params }
    ).subscribe(response => {
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
      `http://localhost:5000/api/cars/${carId}`,
      { ...params }
    ).subscribe(response => {
      this.router.navigate(['/admin/cars']);
    });
  }

  deleteCar(index: number) {
    this.cars.splice(index, 1);
  }

  getCar(id: string) {
    return this.http.get<{ message: string, car: any }>(
      `http://localhost:5000/api/cars/${id}`
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
