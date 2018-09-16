import { Component, OnInit } from '@angular/core';
  @Component({
    selector: 'app-plants-list',
    templateUrl: './plants.component.html',
    styleUrls: ['./plants.component.scss']
  })
  export class PlantsListComponent implements OnInit {
    plants = [{name: 'Pirangut', address: 'Pirangut, Pune', contact: '9999999999', adminUser: 'test'}
    , {name: 'Pirangut', address: 'Pirangut, Pune', contact: '9999999999', adminUser: 'test'}];
    constructor() {}
    ngOnInit() {
    }
  }
