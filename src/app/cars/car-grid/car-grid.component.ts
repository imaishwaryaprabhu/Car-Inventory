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
  selectedModal: string;
  page = 1;
  pageSize = 3;
  collectionSize: number;
  showLoadMore = false;

  constructor(
    private carModalService: NgbModal, 
    private route: ActivatedRoute,
    private carService: CarService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams: Params) => {
      this.selectedModal = (queryParams['modal']) ? queryParams['modal'] : "";
      this.page = 1;
      this.carService.getCars(this.pageSize, this.page, this.selectedModal).subscribe((carData: any) => {
        this.cars = carData.cars;
        this.collectionSize = carData.totalCount;
        this.showLoadMore = (this.collectionSize - this.cars.length) > 0;
      });
    });
  }

  open(car: Car) {
    const carModalRef = this.carModalService.open(CarDetailCardComponent);
    carModalRef.componentInstance.carId = car._id;
  }

  onLoadMore() {
    this.carService.getCars(this.pageSize, this.page + 1, this.selectedModal).subscribe((carData) => {
      this.cars = [...this.cars, ...carData.cars];
      this.collectionSize = carData.totalCount;
      this.page++;
      this.showLoadMore = (this.collectionSize - this.cars.length) > 0;
    });
  }
}
