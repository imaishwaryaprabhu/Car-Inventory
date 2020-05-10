import { Modal } from './modal.modal';

export class Car {
    constructor(
        public _id: string, 
        public name: string, 
        public make: string,
        public modal: Modal, 
        public price: number, 
        public launchDate: Date,
        public imagePath: string,
        public description: string) {}
}