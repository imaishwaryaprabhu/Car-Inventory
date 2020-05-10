import { Injectable } from '@angular/core';
import { Modal } from '../modals/modal.modal';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modals: Modal[] = [
    new Modal("1", "Sedan"),
    new Modal("2", "SUV"),
    new Modal("3", "Coupe"),
    new Modal("4", "Wagon"),
    new Modal("5", "Crossover"),
    new Modal("6", "Hybrid")
  ];

  modalStartedEditing = new Subject<Modal>();
  modalListChanged = new Subject<Modal[]>();

  constructor() { }

  getModals() {
    return this.modals.slice();
  }

  addModal(name: string) {
    const id = this.modals.length + 1;
    const newModal = new Modal(id.toString(), name);
    this.modals.push(newModal);
    this.modalListChanged.next(this.getModals());
  }

  updateModal(modalId: string, modalName: string) {
    const index = this.modals.findIndex(ele => {
      return ele._id === modalId;
    });
    this.modals[index]['name'] = modalName;
    this.modalListChanged.next(this.getModals());
  }

  deleteModal(modalId: string) {
    const index = this.modals.findIndex(ele => {
      return ele._id === modalId;
    })
    this.modals.splice(index, 1);
    this.modalListChanged.next(this.getModals());
  }
}
