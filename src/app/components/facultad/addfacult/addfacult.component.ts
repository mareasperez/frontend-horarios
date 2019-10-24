import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { FacultadModel } from 'src/app/models/facultad.model';
import { FacultadSerivice } from '../../../services/facultad.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { matErrorsMessage } from 'src/app/utils/errors';
@Component({
  selector: 'app-addfacult',
  templateUrl: './addfacult.component.html',
  styleUrls: ['./addfacult.component.css']
})
export class AddfacultComponent implements OnInit {

  @Output() hideAdd = new EventEmitter<boolean>();
  @Output() dataFacultad = new EventEmitter<FacultadModel>();
  @Input() facultad:FacultadModel ;
  public form:FormGroup;
  public Errors:matErrorsMessage = new matErrorsMessage()


  constructor() { }

  ngOnInit() {
    console.log(this.facultad)
   this.form = new FormGroup({
     nombre: new FormControl(this.facultad !== null ? this.facultad.facultad_nombre:'' , [Validators.required, Validators.maxLength(100)])
   })
  }
  get Form(){
    return this.form.controls
  }
  sendData(){
    if(this.facultad === null){
      this.facultad = new FacultadModel()
      this.facultad.facultad_id = null
      this.facultad.facultad_nombre = this.form.value.nombre
    }else{
      this.facultad.facultad_nombre = this.form.value.nombre
    }
    this.dataFacultad.emit(this.facultad)
    this.hideAdd.emit(true)

  }

  cancel(){
    this.hideAdd.emit(true)

  }

  

}
