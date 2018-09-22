import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
  @Component({
    selector: 'app-size-list',
    templateUrl: './size.component.html',
    styleUrls: ['./size.component.scss']
  })
  export class SizeListComponent implements OnInit {
    public displayedColumns = ['size', 'conversion', 'actions'];
    sizes = [{size: '600X250X125', conversion: '1 Meter = 1000 mm'}
    , {size: '600X250X125', conversion: '1 Meter = 1000 mm'}];
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
