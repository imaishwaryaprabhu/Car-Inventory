import { Component, OnInit } from '@angular/core';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';
import { Modal } from 'src/app/modals/modal.modal';
import { CarService } from 'src/app/services/car.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Car } from 'src/app/modals/car.modal';

@Component({
  selector: 'admin-car-edit',
  templateUrl: './admin-car-edit.component.html',
  styleUrls: ['./admin-car-edit.component.css']
})
export class AdminCarEditComponent implements OnInit {
  model: NgbDateStruct;
  date: {year: number, month: number};
  carForm: FormGroup;
  editMode = false;
  modalCategories: Modal[];
  editId: string;

  constructor(
    private calendar: NgbCalendar, 
    private modalService: ModalService, 
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.modalCategories = this.modalService.getModals();
    this.editId = this.route.snapshot.paramMap.get('id');
    if (this.editId) 
      this.editMode = true;
    this.initalizeForm();
  }

  private initalizeForm() {
    this.carForm = new FormGroup({
      '_id': new FormControl(""),
      'name': new FormControl("", [Validators.required, Validators.pattern(/[a-zA-Z ]*/), Validators.minLength(3), Validators.maxLength(10)]),
      'make': new FormControl("", [Validators.required]),
      'modal': new FormControl("", [Validators.required]),
      'price': new FormControl("", [Validators.required, Validators.min(100), Validators.max(100000)]),
      'launchDate': new FormControl("", [Validators.required]),
      'imagePath': new FormControl("", [Validators.required]),
      'description': new FormControl("", [Validators.required])
    });

    if (this.editMode) {
      const car = this.carService.getCar(this.editId);
      this.carForm.patchValue(car);
    }
  }

  onAddEditCar() {
    if (this.carForm.invalid)
      return false;

    const launchDate = this.carForm.value.launchDate;
    this.carForm.value.launchDate = new Date(launchDate.year, launchDate.month, launchDate.day)
    if (this.editMode) {
      this.carService.updateCar(this.editId, this.carForm.value);
    } else {
      this.carService.addCar(this.carForm.value);
    }
    this.router.navigate(['/admin/cars']);
  }

  getFormControl(formControlName: string) {
    return this.carForm.get(formControlName);
  }
}
