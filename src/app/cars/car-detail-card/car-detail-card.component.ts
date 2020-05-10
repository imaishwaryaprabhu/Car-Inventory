import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Car } from 'src/app/modals/car.modal';

@Component({
  selector: 'car-detail-card',
  templateUrl: './car-detail-card.component.html',
  styleUrls: ['./car-detail-card.component.css']
})
export class CarDetailCardComponent implements OnInit {
  @Input() car: Car;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
