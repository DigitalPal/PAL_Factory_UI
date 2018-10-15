import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { RawMaterialConsumption } from '../Entities/RawMaterialConsumption';
import { RawMaterialConsumptionService } from '../Services/rawMaterialConsumptionService';
import { ProductionEntry } from '../Entities/ProductionEntry';
import { ProductionEntryService } from '../Services/productionEntry.service';
@Component({
  selector: 'app-production-entry-list',
  templateUrl: './productionEntry.component.html',
  styleUrls: ['./productionEntry.component.scss']
})
export class ProductionEntryListComponent implements OnInit {
  public displayedColumns = ['date', 'product', 'quantity', 'breakage', 'remark', 'actions'];
  productionEntries: ProductionEntry[] = [{
      breakage: '0',
      date: '02/10/2018',
      id: null,
      productId: null,
      productname: '600X250X125 MM',
      quantity: 500,
    remark: 'NA'
  }];
  model = {
    id: null,
    date: '',
    product: '',
    quantity: 0,
    breakage: '',
    remark: '',
  };
  constructor(private modalService: NgbModal, private service: ProductionEntryService, private spinner: NgxSpinnerService) {}

  open(content, row) {
    console.log(row);
    if (!row) {
      this.model.id = null;
      this.model.date = '';
      this.model.product = '';
      this.model.quantity = 0;
      this.model.breakage = '';
      this.model.remark = '';
    } else {
      this.model.id = row.id;
      this.model.date = row.date;
      this.model.product = row.material;
      this.model.quantity = row.quantity;
      this.model.breakage = row.breakage;
      this.model.remark = row.remark;
    }
    this.modalService.open(content, {
      size: 'lg',
      ariaLabelledBy: 'modal-basic-title'
    }).result.then((result) => {
      this.spinner.show();
      if (result === 'SAVE') {
        if (this.model.id) {
          this.editProductionEntry();
        } else {
          this.saveProductionEntry();
        }
      } else {
        this.spinner.hide();
      }
    }, (reason) => {
      // handle close exception
    });
  }

  ngOnInit() {
    // this.spinner.show();
    this.getProductionEntry();
  }

  saveProductionEntry() {
    // this.service.addRawMaterial({
    //   name: this.model.name,
    //   measurementType: this.model.measurementType,
    // }).subscribe(s => this.getRawMaterial());
  }

  deleteProductionEntry(row) {
    // this.spinner.show();
    // this.service.deleteRawMaterial(row).subscribe(s => this.getRawMaterial());
  }


  editProductionEntry() {
    // this.service.editRawMaterial({
    //   id: this.model.id,
    //   name: this.model.name,
    //   measurementType: this.model.measurementType,
    // }).subscribe(s => this.getRawMaterial());
  }


  getProductionEntry() {
    // this.service.getRawMaterials('').subscribe(s => {
    //   const localRawMaterials = [];
    //   if (s && s.length > 0) {
    //     s.forEach(element => {
    //       localRawMaterials.push({
    //         id: element.Id,
    //         name: element.Title,
    //         measurementType: element.MeasureType,
    //       });
    //     });
    //   }
    //   this.rawMaterials = localRawMaterials;
    //   this.spinner.hide();
    // });
  }

}
