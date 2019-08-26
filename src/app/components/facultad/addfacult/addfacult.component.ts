import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
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

  @Output() hideAdd = new EventEmitter<boolean>();
  @Output() dataFacultad = new EventEmitter<{}>();
  @Input() id: number;
  public form:FormGroup;
 

  constructor() { }

  ngOnInit() {
   this.form = new FormGroup({
     nombre: new FormControl('', Validators.required)
   })
  }

  sendData(){
    console.log(this.id)
    this.dataFacultad.emit({type:this.id,data:this.form.value})
    this.hideAdd.emit(true)

  }

  

}
