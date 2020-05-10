import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarDetailCardComponent } from '../car-detail-card/car-detail-card.component';
import { ActivatedRoute, Params } from '@angular/router';
import { Car } from 'src/app/modals/car.modal';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'car-grid',
  templateUrl: './car-grid.component.html',
  styleUrls: ['./car-grid.component.css']
})
export class CarGridComponent implements OnInit {
  cars: Car[];
  filteredCars: Car[];

  constructor(
    private carModalService: NgbModal, 
    private route: ActivatedRoute,
    private carService: CarService
  ) { }

  ngOnInit(): void {
    this.cars = this.carService.getCars();
    this.route.queryParams.subscribe((queryParams: Params) => {
      let modal = queryParams['modal'];
      this.filteredCars = (modal) ? this.cars.filter(c => c.modal.name === modal) : this.cars;
    });
  }

  open(car: Car) {
    const carModalRef = this.carModalService.open(CarDetailCardComponent);
    carModalRef.componentInstance.car = car;
  }
}
