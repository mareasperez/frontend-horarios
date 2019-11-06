import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DocenteHorasService } from 'src/app/services/docente-horas.service';
import { DocenteHorasModel } from 'src/app/models/docente.horas.model';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { DocenteModel } from 'src/app/models/docente.model';
import { PlanificacionModel } from 'src/app/models/planificacion.model';
import { PlanificacionService } from 'src/app/services/planificacion.service';
import { DocenteService } from 'src/app/services/docente.service';
import { matErrorsMessage } from 'src/app/utils/errors';

interface DialogData {
  type: string;
  dh?: DocenteHorasModel;
}

@Component({
  selector: 'app-doc-horas-add',
  templateUrl: './doc-horas-add.component.html',
  styleUrls: ['./doc-horas-add.component.scss']
})
export class DocHorasAddComponent implements OnInit, OnDestroy {
  public form:FormGroup;
  private subs:Subscription[]=[]
  public docentes:DocenteModel[]=[]
  public planificaciones:PlanificacionModel[]=[]
  public Errors:matErrorsMessage = new matErrorsMessage()

  constructor(private fb:FormBuilder,
              private _doc_hr:DocenteHorasService,
              public dialogRef: MatDialogRef<DocHorasAddComponent>,
              private _planificacion:PlanificacionService,
              private _docente:DocenteService,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private _snack:MatSnackBar
    ) { 
      this.subs.push( this._docente.getDocente().subscribe(res=>this.docentes.push(res)));
      this.subs.push( this._planificacion.getPlanificaciones().subscribe(res=>this.planificaciones.push(res)));


      
    }

  ngOnInit() {
    this.createForm()
  }

  ngOnDestroy(){
    this.subs.map(sub=>sub.unsubscribe())
  }

  get Form(){
    return this.form.controls
  }

  createForm(){
    if (this.data.type === 'c') {
      this.form = this.fb.group({
        dh_id: null,
        dh_horas_planta: new FormControl('',[Validators.required, Validators.min(0)]),
        dh_horas_hor: new FormControl('',[Validators.required,Validators.min(0)]),
        dh_horas_total: 0,
        dh_docente: new FormControl('0',[Validators.required]),
        dh_planificacion: new FormControl('0',[Validators.required])
      })
    }else{
        this.form = this.fb.group({
          dh_id: this.data.dh.dh_id,
          dh_horas_planta: new FormControl(this.data.dh.dh_horas_planta,[Validators.required,Validators.min(0)]),
          dh_horas_hor: new FormControl(this.data.dh.dh_horas_hor,[Validators.required,Validators.min(0)]),
          dh_horas_total: 0,
          dh_docente: new FormControl(this.data.dh.dh_docente,[Validators.required]),
          dh_planificacion: new FormControl(this.data.dh.dh_planificacion,[Validators.required])

        })
      }
  }

  saveDH() {
    let dh = new DocenteHorasModel();
    dh = Object.assign(dh, this.form.value);
    dh.dh_horas_total = +dh.dh_horas_planta + +dh.dh_horas_hor
    this.subs.push(
      this._doc_hr.crearDcHora(dh)
        .subscribe(
          res => this.dialogRef.close(),
          error=>this._snack.open(error.message,"OK",{duration: 3000}),
        )
    );
   

  }
  updateDH() {
    let dh = new DocenteHorasModel();
    dh = Object.assign(dh, this.form.value);
    dh.dh_horas_total = +dh.dh_horas_planta + +dh.dh_horas_hor
    this.subs.push(
      this._doc_hr.updateDcHora(dh, dh.dh_id)
        .subscribe(
          res => this.dialogRef.close(),
          error=>this._snack.open(error.message,"OK",{duration: 3000}),           
        )
    );
    
  }

}
