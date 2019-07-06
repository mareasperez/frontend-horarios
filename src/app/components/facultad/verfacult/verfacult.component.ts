import { Component, OnInit, HostBinding } from '@angular/core';
import { FacultadSerivice } from 'src/app/services/facultad.service';
import { FacultadModel } from 'src/app/models/facultad.model';

@Component({
  selector: 'app-verfacult',
  templateUrl: './verfacult.component.html',
  styleUrls: ['./verfacult.component.css']
})
export class VerfacultComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  public facultades: FacultadModel[] = [];
  public alerts = true;
  constructor(private facultaService: FacultadSerivice) {


  }

  ngOnInit() {
    this.getfacultades()

  }
  getfacultades() {
    this.facultades = []
    this.facultaService.getFacultad().subscribe(
      res => {
        this.facultades.push(res);
        this.alerts = false;
      },
      err => {
        console.error(err)
       
      }
    );
    
  }
  deleteFaculta(id: string) {
    this.facultaService.deleteFacultad(parseInt(id)).subscribe(
      res => {
        console.log(res);
        this.getfacultades();
      },
      err => console.log(err)
    );
  }

}
