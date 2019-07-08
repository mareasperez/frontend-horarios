import { Component, OnInit, HostBinding } from '@angular/core';
import { FacultadModel } from 'src/app/models/facultad.model';
import { FacultadSerivice } from '../../../services/facultad.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-addfacult',
  templateUrl: './addfacult.component.html',
  styleUrls: ['./addfacult.component.css']
})
export class AddfacultComponent implements OnInit {
  @HostBinding('class') classes = 'row';

  facultad = new FacultadModel();
  edit: boolean = false;

  constructor(private facultadService: FacultadSerivice, private route: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      this.facultadService.getFacultadByID(params.id)
        .subscribe(
          res => {
            console.log(res);
            this.facultad.id = res.id;
            this.facultad.nombre = res.nombre;
            this.edit = true;
          },
          err => console.error(err)
        )
    }
  }

  saveFacultad() {
    //console.log(this.facultad);
    this.facultadService.crearFacultad(this.facultad)
      .subscribe(
        res => {
          console.log(res);
          //this.route.navigate(['/facultad/list'])
        },
        err => console.error(err)
      )
  }
  updateFacultad() {
    //console.log(this.facultad);
    this.facultadService.updateFacultad(this.facultad, this.activatedRoute.snapshot.params.id)
      .subscribe(
        res => {
          console.log(res);
          this.route.navigate(['/facultad/list'])
        },
        err => console.error(err)
      )
  }
}
