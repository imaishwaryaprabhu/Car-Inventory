import { Modal } from './modal.modal';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export class Car {
    constructor(
        public _id: string, 
        public name: string, 
        public make: string,
        public modal: Modal, 
        public price: number, 
        public launchDate: NgbDateStruct,
        public imagePath: string,
        public description: string) {}
}