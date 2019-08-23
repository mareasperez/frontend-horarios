import { Component, OnInit} from '@angular/core';
import { FacultadModel } from 'src/app/models/facultad.model';
import { FacultadSerivice } from '../../../services/facultad.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-addfacult',
  templateUrl: './addfacult.component.html',
  styleUrls: ['./addfacult.component.css']
})
export class AddfacultComponent implements OnInit {
  facultad = new FacultadModel();
  editing = false;
  public form:FormGroup;

  constructor(private facultadService: FacultadSerivice,
              private route: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
   this.form = new FormGroup({
     nombre: new FormControl('', Validators.required)
   })
  }

  saveFacultad() {
    this.editing = true
    this.facultad.facultad_nombre = this.form.value.nombre;
    this.facultad.facultad_id = null;
    this.facultadService.crearFacultad(this.facultad).subscribe(res=>{
      this.form.reset();
      this.editing = false
    })
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
