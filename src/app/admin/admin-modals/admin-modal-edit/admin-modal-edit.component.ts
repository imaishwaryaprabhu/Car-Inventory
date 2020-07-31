import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';
import { Modal } from 'src/app/modals/modal.modal';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'admin-modal-edit',
  templateUrl: './admin-modal-edit.component.html',
  styleUrls: ['./admin-modal-edit.component.css']
})
export class AdminModalEditComponent implements OnInit {
  @ViewChild('modalForm', { static: false }) modalForm: NgForm;
  editMode = false;
  editModal: Modal;
  
  constructor(private modalService: ModalService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.modalService.modalStartedEditing.subscribe((modal) => {
      this.editModal = modal;
      this.editMode = true;
      this.modalForm.setValue({
        'name': modal.name
      });
    })
  }

  onAddEditModal() {
    if (this.modalForm.invalid)
      return false;

    if (this.editMode) 
      this.modalService.updateModal(this.editModal._id, this.modalForm.value.name)
        .subscribe(data => {
          this.toastService.showSuccess("Modal has been updated");
          this.modalService.modalCompletedEditing.next()
        });
    else 
      this.modalService.addModal(this.modalForm.value.name)
        .subscribe(data => {
          this.toastService.showSuccess("Modal has been added");
          this.modalService.modalCompletedEditing.next()
        });
    this.editMode = false;
    this.modalForm.reset();
  }

}
