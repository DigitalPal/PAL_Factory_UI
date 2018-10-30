import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Plant } from '../FactoryManagement/Entities/plant';
import { AuthenticationService } from '../FactoryManagement/Services/authentication.service';
import { PlantsService } from '../FactoryManagement/Services/plants.service';

@Component({
  selector: 'cdk-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  constructor(private modalService: NgbModal, private service: PlantsService
    , private authenticationService: AuthenticationService, private router: Router) {}
  plants: Plant[] = [];
  ngOnInit() {}

  Authenticate(userName, password) {
    console.log('here');
    this.authenticationService.userAuthentication(userName, password).subscribe((data: any) => {
      localStorage.setItem('DigitalPalToken', data.access_token);
      this.router.navigate(['/home']);
    });
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
            userName: 'Astracon Admin', // element.CreatedBy,
            userId: element.CreatedBy
          });
        });
      }
      this.plants = localPlants;
    });
  }
}
