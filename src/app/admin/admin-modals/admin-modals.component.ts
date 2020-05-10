import { Component, OnInit, OnDestroy } from '@angular/core';
import { Modal } from 'src/app/modals/modal.modal';
import { ModalService } from 'src/app/services/modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'admin-modals',
  templateUrl: './admin-modals.component.html',
  styleUrls: ['./admin-modals.component.css']
})

export class AdminModalsComponent implements OnInit, OnDestroy {
  page = 1;
  pageSize = 4;
  collectionSize: number;
  modals: Modal[];
  filteredModals: Modal[];
  subscription: Subscription;

  constructor(private modalService: ModalService) {}

  refreshList() {
    this.filteredModals = this.modals
      // .map((modal, i) => ({id: i + 1, ...modal}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  ngOnInit(): void {
    this.subscription = this.modalService.modalListChanged.subscribe((modals: Modal[]) => {
      this.modals = modals;
      this.collectionSize = this.modals.length;
      this.refreshList();
    });

    this.modals = this.modalService.getModals();
    this.collectionSize = this.modals.length;
    this.refreshList();
  }

  onEditModal(modal: Modal) {
    this.modalService.modalStartedEditing.next(modal);
  }

  onDeleteModal(id: string) {
    this.modalService.deleteModal(id);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
