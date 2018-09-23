import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Plant } from '../Entities/plant';
import { PlantsService } from '../Services/plants.service';
@Component({
  selector: 'app-plants-list',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.scss']
})
export class PlantsListComponent implements OnInit {
  public displayedColumns = ['name', 'address', 'contact', 'adminUser', 'actions'];
  plants: Plant[] = [];
  model = {
    id: null,
    name: '',
    address: '',
    contact: '',
    adminUser: ''
  };
  constructor(private modalService: NgbModal, private service: PlantsService, private spinner: NgxSpinnerService) {}

  open(content, row) {
    if (!row) {
      this.model.id = null;
      this.model.name = '';
      this.model.address = '';
      this.model.contact = '';
      this.model.adminUser = null;
    } else {
      this.model.id = row.id;
      this.model.name = row.name;
      this.model.address = row.address;
      this.model.contact = row.contact;
      this.model.adminUser = row.userId;
    }
    this.modalService.open(content, {
      size: 'lg',
      ariaLabelledBy: 'modal-basic-title'
    }).result.then((result) => {
      this.spinner.show();
      if (result === 'SAVE') {
        if (this.model.id) {
          this.editPlant();
        } else {
          this.savePlant();
        }
      }
    }, (reason) => {
      // handle close exception
    });
  }

  ngOnInit() {
    this.spinner.show();
    this.getPlants();
  }

  savePlant() {
    this.service.addPlant({
      name: this.model.name,
      address: this.model.address,
      contact: this.model.contact,
      userName: this.model.adminUser,
      userId: this.model.adminUser,
    }).subscribe(s => this.getPlants());
  }

  deletePlant(row) {
    this.spinner.show();
    this.service.deletePlant(row).subscribe(s => this.getPlants());
  }


  editPlant() {
    this.service.editPlant({
      id: this.model.id,
      name: this.model.name,
      address: this.model.address,
      contact: this.model.contact,
      userName: this.model.adminUser,
      userId: this.model.adminUser,
    }).subscribe(s => this.getPlants());
  }


  getPlants() {
    this.service.getPlants('').subscribe(s => {
      const localPlants = [];
      if (s && s.length > 0) {
        s.forEach(element => {
          localPlants.push({
            id: element.Id,
            name: element.Name,
            address: element.Address,
            contact: element.ContactNumber,
            userName: element.CreatedBy,
            userId: element.CreatedBy
          });
        });
      }
      this.plants = localPlants;
      this.spinner.hide();
    });
  }
}
