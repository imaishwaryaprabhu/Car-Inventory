import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { Modal } from 'src/app/modals/modal.modal';

@Component({
  selector: 'modal-categories',
  templateUrl: './modal-categories.component.html',
  styleUrls: ['./modal-categories.component.css']
})
export class ModalCategoriesComponent implements OnInit {
  modalCategories: Modal[];

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
    this.modalCategories = this.modalService.getModals();
  }

}
