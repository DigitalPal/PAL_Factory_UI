import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { PriceDetail } from '../Entities/PriceDetails';
import { PriceDetailsService } from '../Services/priceDetails.service';
  @Component({
    selector: 'app-price-list',
    templateUrl: './priceDetails.component.html',
    styleUrls: ['./priceDetails.component.scss']
  })
  export class PriceDetailListComponent implements OnInit {
    public displayedColumns = ['size', 'price', 'unit', 'actions'];

      priceDetails: PriceDetail[] = [];
  model = {
    id: null,
    size: '',
    price: '',
    unit: ''
  };

  constructor(private modalService: NgbModal, private service: PriceDetailsService, private spinner: NgxSpinnerService) {}

  open(content, row) {
    if (!row) {
      this.model.id = null;
      this.model.size = '';
      this.model.price = '';
      this.model.unit = '';
    } else {
      this.model.id = row.id;
      this.model.size = row.size;
      this.model.price = row.price;
      this.model.unit = row.unit;
    }
    this.modalService.open(content, {
      size: 'lg',
      ariaLabelledBy: 'modal-basic-title'
    }).result.then((result) => {
      this.spinner.show();
      if (result === 'SAVE') {
        if (this.model.id) {
          this.editPriceDetail();
        } else {
          this.savePriceDetail();
        }
      } else {
        this.spinner.hide();
      }
    }, (reason) => {
      // handle close exception
    });
  }

    ngOnInit() {
      this.spinner.show();
      this.getPriceDetails();
    }

    savePriceDetail() {
      this.service.addPriceDetail({
        size: this.model.size,
        price: this.model.price,
        unit: this.model.unit,
      }).subscribe(s => this.getPriceDetails());
    }
    deletePriceDetail(row) {
      this.spinner.show();
      this.service.deletePriceDetail(row).subscribe(s => this.getPriceDetails());
    }

    editPriceDetail() {
      this.service.editPriceDetail({
        id: this.model.id,
        size: this.model.size,
        price: this.model.price,
        unit: this.model.unit,
      }).subscribe(s => this.getPriceDetails());
    }
    getPriceDetails() {
      this.service.getPriceDetails('').subscribe(s => {
        const localPriceDetails = [];
        if (s && s.length > 0) {
          s.forEach(element => {
            localPriceDetails.push({
              id: element.Id,
              size: element.size,
              price: element.price,
              unit: element.unit,
            });
          });
        }
        this.priceDetails = localPriceDetails;
        this.spinner.hide();
      });
    }
  }
