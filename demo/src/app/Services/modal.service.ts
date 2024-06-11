// modal.service.ts
import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private activeModal: NgbModalRef | null = null;

  constructor(private modalService: NgbModal) {}

  open(content: any, options?: any): void {
    this.close();

    this.activeModal = this.modalService.open(content, options);
  }

  close(): void {
    if (this.activeModal) {
      this.activeModal.dismiss();
      this.activeModal = null;
    }
  }
}
