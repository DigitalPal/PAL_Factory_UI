import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductionEntry } from '../Entities/ProductionEntry';
import { ProductionEntryService } from '../Services/productionEntry.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-production-entry-list',
  templateUrl: './productionEntry.component.html',
  styleUrls: ['./productionEntry.component.scss']
})
export class ProductionEntryListComponent implements OnInit {
  public displayedColumns = ['productionNumber', 'productionDate', 'noOfMouldsCasted', 'remark', 'actions'];
  productionEntries: ProductionEntry[] = [];
  constructor(private service: ProductionEntryService
    , private spinner: NgxSpinnerService
    , private router: Router) {}

    ngOnInit() {
      this.spinner.show();
      this.getProductionEntry();
    }

    newProductionClick() {
      this.router.navigate(['/auth/productionDetails']);
    }

  getProductionEntry() {
    this.service.getProductionEntrys('').subscribe(s => {
      const localProdctionEntrys = [];
      if (s && s.length > 0) {
        s.forEach(element => {
          localProdctionEntrys.push({
            id: element.Id,
            productionNumber : element.ProductionNumber,
            productionDate : element.ProductionDate,
            breakage : element.Breakage,
            noOfMouldsCasted : element.NoOfMouldsCasted,
            remark : element.Remark,
          });
        });
      }
      this.productionEntries = localProdctionEntrys;
      this.spinner.hide();
    });
  }

  deleteProductionEntry(row) {
    this.service.deleteProductionEntry(row);
  }
}
