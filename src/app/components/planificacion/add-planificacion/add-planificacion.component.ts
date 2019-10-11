import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PlanificacionModel } from 'src/app/models/planificacion.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PlanificacionService } from 'src/app/services/planificacion.service';
import { Subscription } from 'rxjs';
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
  private subs:Subscription[]=[]
  constructor(private _planificacion: PlanificacionService,
              public dialogRef: MatDialogRef<AddPlanificacionComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private fb:FormBuilder
  ) { }
            

  ngOnInit() {
    this.createForm()
  }
  
  createForm(id?: string){
    if (this.data.type === 'c') {
      this.form = this.fb.group({
        planificacion_anyo_lectivo: new FormControl('',[Validators.required, Validators.min(2008)]),
        planificacion_semestre: new FormControl('1',[Validators.required])
    
      })

    }else{
      this.form = this.fb.group({
        planificacion_id: new FormControl(this.data.plan.planificacion_id),
        planificacion_anyo_lectivo: new FormControl(this.data.plan.planificacion_anyo_lectivo,[Validators.required, Validators.min(2008)]),
        planificacion_semestre: new FormControl(this.data.plan.planificacion_semestre,[Validators.required])
      })
    }
  }

  savePlanificacion(){
    let plan = new PlanificacionModel()
    plan = Object.assign(plan, this.form.value)
    this.subs.push(
      this._planificacion.crearPlanificacion(plan)
        .subscribe(res=>this.dialogRef.close())
    );
  }

  updatePlanificacion(){
    let plan = new PlanificacionModel()
    plan = Object.assign(plan, this.form.value)
    this.subs.push(
      this._planificacion.updatePlanificacion(plan,plan.planificacion_id)
        .subscribe(res=>this.dialogRef.close())
    );
  }

}
