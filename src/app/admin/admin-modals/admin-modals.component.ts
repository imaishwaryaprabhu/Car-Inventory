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
  postsSubscription: Subscription;
  postChangeSubscription: Subscription;

  constructor(private modalService: ModalService) {}

  refreshList() {
    this.modalService.getModals(this.pageSize, this.page);
  }

  ngOnInit(): void {
    this.modalService.getModals(this.pageSize, this.page);
    this.postsSubscription = this.modalService.modalListChanged
      .subscribe((modalData: { modals: Modal[], totalCount: number }) => {
        this.modals = modalData.modals;
        this.collectionSize = modalData.totalCount;
      });
    this.postChangeSubscription = this.modalService.modalCompletedEditing
      .subscribe(() => this.refreshList());
  }

  onEditModal(modal: Modal) {
    this.modalService.modalStartedEditing.next(modal);
  }

  onDeleteModal(id: string) {
    this.modalService.deleteModal(id)
      .subscribe(data => this.refreshList());
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
    this.postChangeSubscription.unsubscribe();
  }

}
