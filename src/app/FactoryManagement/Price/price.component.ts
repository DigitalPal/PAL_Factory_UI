import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
  @Component({
    selector: 'app-price-list',
    templateUrl: './price.component.html',
    styleUrls: ['./price.component.scss']
  })
  export class PriceListComponent implements OnInit {
    public displayedColumns = ['size', 'price', 'unit', 'actions'];
    prices = [{size: '600X250X125', price: '3250', unit: 'Cubic Meter'}
    , {size: '600X250X125', price: '3250', unit: 'Cubic Meter'}];
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
