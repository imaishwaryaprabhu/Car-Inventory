import { Injectable } from '@angular/core';
import { Car } from '../modals/car.modal';
import { Modal } from '../modals/modal.modal';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private cars: Car[] = [
    new Car(
      "1", 
      "Civic LX", 
      "Honda",
      new Modal("1", "Sedan"), 
      10998, 
      new Date(2010, 9, 18), 
      "https://img2.carmax.com/img/vehicles/19338242/1.jpg",
      "This is just a testing description"
    ),
    new Car(
      "2",
      "Fusion",
      "Ford",
      new Modal("3", "Wagon"),
      9998,
      new Date(2009, 4, 12),
      "https://img2.carmax.com/img/vehicles/19337963/1.jpg",
      "This is just a testing description"
    ),
    new Car(
      "3",
      "Venza",
      "Toyota",
      new Modal("2", "SUV"),
      12000,
      new Date(2010, 10, 15),
      "https://img2.carmax.com/img/vehicles/18905745/1/400.jpg",
      "The most comprehensive Angular 4 (Angular 2+) course. Build a real e-commerce app with Angular, Firebase and Bootstrap 4"
    ),
    new Car(
      "4",
      "Juke S",
      "Nissan",
      new Modal("2", "SUV"),
      1510,
      new Date(18, 12, 20),
      "https://img2.carmax.com/img/vehicles/19337638/1/400.jpg",
      "The most comprehensive Angular 4 (Angular 2+) course. Build a real e-commerce app with Angular, Firebase and Bootstrap 4"
    )
  ]

  constructor() { }

  getCars() {
    return this.cars.slice();
  }

  addCar(newCar: Car) {
    const id = this.cars.length + 1;
    newCar._id = id.toString();
    console.log(typeof newCar);
    this.cars.push(newCar);
    console.log(this.cars)
  }

  updateCar(carId: string, car: Car) {
    const index = this.cars.findIndex(ele => {
      return ele._id === carId;
    });
    this.cars[index] = car;
  }

  deleteCar(index: number) {
    this.cars.splice(index, 1);
  }

  getCar(id: string) {
    return this.cars.find((car) => {
      return car._id === id;
    });
  }
}
