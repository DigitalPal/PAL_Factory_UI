import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
  @Component({
    selector: 'app-customer-list',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.scss']
  })
  export class CustomerListComponent implements OnInit {
    public displayedColumns = ['name', 'custNumber', 'gst', 'address', 'contact', 'type', 'desc', 'actions'];
    customers = [{name: 'NAMARTA DEVELOPERS', custNumber: 'CUST00001', gst: 'GTSIN000921', address: 'Katraj, Pune', contact: '9999999999', type: 'Builder', desc: 'Leading Builder'}
    , {name: 'TEST DEVELOPERS', custNumber: 'CUST00002', gst: 'GTSIN000875', address: 'Balaji Nagar, Pune', contact: '9999999999', type: 'Builder', desc: 'Leading Builder'}];
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
