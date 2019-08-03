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
  edit = false;

  constructor(private facultadService: FacultadSerivice, private route: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      this.facultadService.getFacultadByID(params.id)
        .subscribe(
          res => {
            console.log(res);
            this.facultad.facultad_id = res.facultad.facultad_id;
            this.facultad.facultad_nombre = res.facultad.facultad_nombre;
            this.edit = true;
          },
          err => console.error(err)
        );
    }
  }

  saveFacultad() {
    // console.log(this.facultad);
    this.facultadService.crearFacultad(this.facultad)
      .subscribe(
        res => {
          console.log(res);
          // this.route.navigate(['/facultad/list'])
        },
        err => console.error(err)
      );
  }
  updateFacultad() {
    // console.log(this.facultad);
    this.facultadService.updateFacultad(this.facultad, this.activatedRoute.snapshot.params.id)
      .subscribe(
        res => {
          console.log(res);
          this.route.navigate(['/facultad/list']);
        },
        err => console.error(err)
      );
  }
}
