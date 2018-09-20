import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
  @Component({
    selector: 'app-plants-list',
    templateUrl: './plants.component.html',
    styleUrls: ['./plants.component.scss']
  })
  export class PlantsListComponent implements OnInit {
    public displayedColumns = ['name', 'address', 'contact', 'adminUser', 'actions'];
    plants = [{name: 'Pirangut', address: 'Pirangut, Pune', contact: '9999999999', adminUser: 'test'}
    , {name: 'Pirangut', address: 'Pirangut, Pune', contact: '9999999999', adminUser: 'test'}];
    closeResult: string;
    constructor(private modalService: NgbModal) {}

    open(content) {
      this.modalService.open(content, {size: 'lg', ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }

    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
    }

    ngOnInit() {
    }
  }
