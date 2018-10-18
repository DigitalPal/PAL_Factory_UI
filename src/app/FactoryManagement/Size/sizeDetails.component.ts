import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { SizeDetail } from '../Entities/SizeDetail';
import { SizeDetailsService } from '../Services/sizeDetails.service';
  @Component({
    selector: 'app-size-list',
    templateUrl: './sizeDetails.component.html',
    styleUrls: ['./sizeDetails.component.scss']
  })
  export class SizeDetailListComponent implements OnInit {
    public displayedColumns = ['size', 'conversion', 'actions'];
    sizeDetails: SizeDetail[] = [];
    model = {
    id: null,
    size: '',
    conversionFactor: ''
    };

    constructor(private modalService: NgbModal, private service: SizeDetailsService, private spinner: NgxSpinnerService) {}

    open(content, row) {
      if (!row) {
        this.model.id = null;
        this.model.size = '';
        this.model.conversionFactor = '';
      } else {
        this.model.id = row.id;
        this.model.size = row.size;
        this.model.conversionFactor = row.conversionFactor;
      }
      this.modalService.open(content, {
        size: 'lg',
        ariaLabelledBy: 'modal-basic-title'
      }).result.then((result) => {
        this.spinner.show();
        if (result === 'SAVE') {
          if (this.model.id) {
            this.editSizeDetail();
          } else {
            this.saveSizeDetail();
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
    this.getSizeDetails();
    }

    saveSizeDetail() {
      this.service.addSizeDetail({
        size: this.model.size,
        conversionFactor: this.model.conversionFactor,
      }).subscribe(s => this.getSizeDetails());
    }

    deleteSizeDetail(row) {
      this.spinner.show();
      this.service.deleteSizeDetail(row).subscribe(s => this.getSizeDetails());
    }
    editSizeDetail() {
      this.service.editSizeDetail({
        id: this.model.id,
        size: this.model.size,
        conversionFactor: this.model.conversionFactor,
      }).subscribe(s => this.getSizeDetails());
    }

    getSizeDetails() {
      this.service.getSizeDetails('').subscribe(s => {
        const localSizeDetails = [];
        if (s && s.length > 0) {
          s.forEach(element => {
            localSizeDetails.push({
              id: element.Id,
              size: element.Size,
              conversionFactor: element.ConversionFactor,
            });
          });
        }
        this.sizeDetails = localSizeDetails;
        this.spinner.hide();
      });
    }
  }
