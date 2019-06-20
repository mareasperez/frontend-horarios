import { Component, OnInit } from '@angular/core';
import { FacultadSerivice } from 'src/app/services/facultad-serivice';

@Component({
  selector: 'app-verfacult',
  templateUrl: './verfacult.component.html',
  styleUrls: ['./verfacult.component.css']
})
export class VerfacultComponent implements OnInit {

  constructor(private facultaService:FacultadSerivice) { 
    this.facultaService.getFacultad().subscribe(facultad=> console.log(facultad));
    
  }

  ngOnInit() {
    this.facultaService.crearFacultad().subscribe()
  }

}
