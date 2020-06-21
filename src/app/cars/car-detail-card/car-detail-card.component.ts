import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Car } from 'src/app/modals/car.modal';
import { CarService } from 'src/app/services/car.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'car-detail-card',
  templateUrl: './car-detail-card.component.html',
  styleUrls: ['./car-detail-card.component.css']
})
export class CarDetailCardComponent implements OnInit {
  @Input() carId: string;
  car$: Observable<Car>;
  constructor(public activeModal: NgbActiveModal, private carService: CarService) { }

  ngOnInit(): void {
    this.car$ = this.carService.getCar(this.carId);
  }

}
