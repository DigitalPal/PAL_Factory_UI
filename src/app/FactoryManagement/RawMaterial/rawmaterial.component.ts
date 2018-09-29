import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { RawMaterial } from '../Entities/RawMaterial';
import { RawMaterialService } from '../Services/rawMaterial.service';
@Component({
  selector: 'app-rawmaterial-list',
  templateUrl: './rawmaterial.component.html',
  styleUrls: ['./rawmaterial.component.scss']
})
export class RawMaterialListComponent implements OnInit {
  public displayedColumns = ['title', 'measurementType', 'actions'];
  rawMaterials: RawMaterial[] = [];
  model = {
    id: null,
    name: '',
    measurementType: '',
  };
  constructor(private modalService: NgbModal, private service: RawMaterialService, private spinner: NgxSpinnerService) {}

  open(content, row) {
    console.log(row);
    if (!row) {
      this.model.id = null;
      this.model.name = '';
      this.model.measurementType = '';
    } else {
      this.model.id = row.id;
      this.model.name = row.name;
      this.model.measurementType = row.measurementType;
    }
    this.modalService.open(content, {
      size: 'lg',
      ariaLabelledBy: 'modal-basic-title'
    }).result.then((result) => {
      this.spinner.show();
      if (result === 'SAVE') {
        if (this.model.id) {
          this.editRawMaterial();
        } else {
          this.saveRawMaterial();
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
    this.getRawMaterial();
  }

  saveRawMaterial() {
    this.service.addRawMaterial({
      name: this.model.name,
      measurementType: this.model.measurementType,
    }).subscribe(s => this.getRawMaterial());
  }

  deleteRawMaterial(row) {
    this.spinner.show();
    this.service.deleteRawMaterial(row).subscribe(s => this.getRawMaterial());
  }


  editRawMaterial() {
    this.service.editRawMaterial({
      id: this.model.id,
      name: this.model.name,
      measurementType: this.model.measurementType,
    }).subscribe(s => this.getRawMaterial());
  }


  getRawMaterial() {
    this.service.getRawMaterials('').subscribe(s => {
      const localRawMaterials = [];
      if (s && s.length > 0) {
        s.forEach(element => {
          localRawMaterials.push({
            id: element.Id,
            name: element.Title,
            measurementType: element.MeasureType,
          });
        });
      }
      this.rawMaterials = localRawMaterials;
      this.spinner.hide();
    });
  }

}
