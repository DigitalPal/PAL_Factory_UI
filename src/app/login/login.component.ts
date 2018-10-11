import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Plant } from '../FactoryManagement/Entities/plant';
import { PlantsService } from '../FactoryManagement/Services/plants.service';
import { AuthenticationService } from '../FactoryManagement/Services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'cdk-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  constructor(private modalService: NgbModal, private service: PlantsService, private authenticationService: AuthenticationService, private router: Router) {}
  plants: Plant[] = [];
  ngOnInit() {
  }

  Authenticate(userName,password){
    this.authenticationService.userAuthentication(userName,password).subscribe((data : any)=>{
      localStorage.setItem('userToken',data.access_token);
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
