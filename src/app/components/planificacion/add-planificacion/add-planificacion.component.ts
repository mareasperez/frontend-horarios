import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { PlanificacionModel } from 'src/app/models/planificacion.model';
import { FormGroup } from '@angular/forms';

interface DialogData {
  type: string;
  plan?: PlanificacionModel;
}
@Component({
  selector: 'app-add-planificacion',
  templateUrl: './add-planificacion.component.html',
  styleUrls: ['./add-planificacion.component.scss']
})
export class AddPlanificacionComponent implements OnInit {
  public form:FormGroup
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,) { }

  ngOnInit() {
  }

}
