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
  @Output() dataFacultad = new EventEmitter<{}>();
  @Input() id: number;
  public form:FormGroup;
  public Errors:matErrorsMessage = new matErrorsMessage()


  constructor() { }

  ngOnInit() {
   this.form = new FormGroup({
     nombre: new FormControl('', [Validators.required, Validators.maxLength(100)])
   })
  }
  get Form(){
    return this.form.controls
  }
  sendData(){
    console.log(this.id)
    this.dataFacultad.emit({id:this.id,data:this.form.value})
    this.hideAdd.emit(true)

  }

  

}
