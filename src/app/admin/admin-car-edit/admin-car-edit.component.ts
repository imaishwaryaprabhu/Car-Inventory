import { Component, OnInit } from '@angular/core';
import {NgbDateStruct, NgbCalendar, NgbDate} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';
import { Modal } from 'src/app/modals/modal.modal';
import { CarService } from 'src/app/services/car.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/modals/car.modal';
import { Observable } from 'rxjs';

@Component({
  selector: 'admin-car-edit',
  templateUrl: './admin-car-edit.component.html',
  styleUrls: ['./admin-car-edit.component.css']
})
export class AdminCarEditComponent implements OnInit {
  model: NgbDateStruct;
  maxDate: NgbDate = this.calendar.getToday();
  minDate: NgbDate = this.calendar.getPrev(this.maxDate, "y", 20);
  carForm: FormGroup;
  editMode = false;
  modalCategories$: Observable<Modal[]>;
  editId: string;

  constructor(
    private calendar: NgbCalendar, 
    private modalService: ModalService, 
    private carService: CarService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.model = this.calendar.getToday();
    this.modalCategories$ = this.modalService.getAllModals();
    this.editId = this.route.snapshot.paramMap.get('id');
    if (this.editId) 
      this.editMode = true;
    this.initalizeForm();
  }

  private initalizeForm() {
    this.carForm = new FormGroup({
      'name': new FormControl("", [Validators.required, Validators.pattern(/[a-zA-Z ]*/), Validators.minLength(3), Validators.maxLength(10)]),
      'make': new FormControl("", [Validators.required]),
      'modal': new FormControl("", [Validators.required]),
      'price': new FormControl("", [Validators.required, Validators.min(100), Validators.max(100000)]),
      'launchDate': new FormControl("", [Validators.required]),
      'imagePath': new FormControl("", [Validators.required]),
      'description': new FormControl("", [Validators.required])
    });

    if (this.editMode) {
      this.carService.getCar(this.editId).subscribe((car: Car) => {
        this.carForm.patchValue(car);
      });
    }
  }

  onAddEditCar() {
    if (this.carForm.invalid)
      return false;

    if (this.editMode) {
      this.carService.updateCar(this.editId, this.carForm.value);
    } else {
      this.carService.addCar(this.carForm.value);
    }
  }

  getFormControl(formControlName: string) {
    return this.carForm.get(formControlName);
  }
}
