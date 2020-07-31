import { Injectable } from '@angular/core';
import { Modal } from '../modals/modal.modal';
import { Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const BACKEND_PATH = environment.backendURL + '/modals';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modals: Modal[] = [];

  modalStartedEditing = new Subject<Modal>();
  modalCompletedEditing = new Subject<void>();
  modalListChanged = new Subject<{ modals: Modal[], totalCount: number }>();

  constructor(private http: HttpClient) { }

  getAllModals() {
    return this.http.get<{ message: string, modals: Modal[], totalCount: number}>(
      BACKEND_PATH
    )
    .pipe(map(response => { 
      return response.modals; 
    }));
  }

  getModals(pageSize: number, page: number) {
    const queryParams = `?pagesize=${pageSize}&pageno=${page}`;
    this.http.get<{ message: string, modals: Modal[], totalCount: number}>(
      BACKEND_PATH + queryParams
    )
    .subscribe(response => {
      this.modals = [...response.modals];
      this.modalListChanged.next({ modals: [...this.modals], totalCount: response.totalCount });
    });
  }

  addModal(name: string) {
    return this.http.post<{ message: string, modal: any }>(
      BACKEND_PATH, 
      { name: name }
    );
  }

  updateModal(modalId: string, modalName: string) {
    return this.http.put<{ message: string, modal: any }>(
      `${BACKEND_PATH}/${modalId}`, 
      { name: modalName }
    );
  }

  deleteModal(modalId: string) {
    return this.http.delete<{ message: string, modal: any }>(
      `${BACKEND_PATH}/${modalId}`,
    );
    // .subscribe(response => {
    //   const index = this.modals.findIndex(m => m._id === modalId );
    //   this.modals.splice(index, 1);
    // });
  }
}
