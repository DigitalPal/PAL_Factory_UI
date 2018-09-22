import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
    name: '',
    address: '',
    contact: '',
    adminUser: ''
  };
  closeResult: string;
  constructor(private modalService: NgbModal, private service: PlantsService) {}

  open(content, row) {
    if (!row) {
      this.model.name = '';
      this.model.address = '';
      this.model.contact = '';
      this.model.adminUser = null;
    } else {
      this.model.name = row.name;
      this.model.address = row.address;
      this.model.contact = row.contact;
      this.model.adminUser = row.userId;
    }
    this.modalService.open(content, {
      size: 'lg',
      ariaLabelledBy: 'modal-basic-title'
    }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'SAVE') {
        this.savePlant();
      }
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
      return `with: ${reason}`;
    }
  }

  ngOnInit() {
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
    });
  }
}
