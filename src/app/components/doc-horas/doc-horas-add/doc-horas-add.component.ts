import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DocenteHorasService } from 'src/app/services/docente-horas.service';
import { DocenteHorasModel } from 'src/app/models/docente.horas.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { DocenteModel } from 'src/app/models/docente.model';
import { PlanificacionModel } from 'src/app/models/planificacion.model';
import { PlanificacionService } from 'src/app/services/planificacion.service';
import { DocenteService } from 'src/app/services/docente.service';
import { matErrorsMessage } from 'src/app/utils/errors';

interface DialogData {
  type: string;
  doc?: DocenteModel;
  plani?: PlanificacionModel;
  dh?: DocenteHorasModel;
  docentes: DocenteModel[];
  planificaciones: PlanificacionModel[];
}

@Component({
  selector: 'app-doc-horas-add',
  templateUrl: './doc-horas-add.component.html',
  styleUrls: ['./doc-horas-add.component.scss']
})
// tslint:disable: variable-name
export class DocHorasAddComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  private subs: Subscription[] = [];
  public docentes: DocenteModel[] = [];
  public planificaciones: PlanificacionModel[] = [];
  public Errors: matErrorsMessage = new matErrorsMessage();

  constructor(
    private fb: FormBuilder,
    private _doc_hr: DocenteHorasService,
    public dialogRef: MatDialogRef<DocHorasAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _snack: MatSnackBar
  ) {
    this.docentes = this.data.docentes;
    this.planificaciones = this.data.planificaciones;
  }

  ngOnInit() {
    this.createForm();
  }

  ngOnDestroy() {
    this.subs.map(sub => sub.unsubscribe());
  }

  get Form() {
    return this.form.controls;
  }

  createForm() {
    if (this.data.type === 'c') {
      this.form = this.fb.group({
        dh_id: null,
        dh_horas_planta: new FormControl('', [Validators.required, Validators.min(0)]),
        dh_horas_hor: new FormControl('', [Validators.required, Validators.min(0)]),
        dh_horas_total: 0,
        dh_docente: new FormControl('', [Validators.required]),
        dh_planificacion: new FormControl(this.data.plani.planificacion_id, [Validators.required])
      });
    } else if (this.data.type === 'a') {
      this.form = this.fb.group({
        dh_id: null,
        dh_horas_planta: new FormControl('', [Validators.required, Validators.min(0)]),
        dh_horas_hor: new FormControl('', [Validators.required, Validators.min(0)]),
        dh_horas_total: 0,
        dh_docente: new FormControl(this.data.doc.docente_id, [Validators.required]),
        dh_planificacion: new FormControl(this.data.plani.planificacion_id, [Validators.required])
      });
    }
    else {
      this.form = this.fb.group({
        dh_id: this.data.dh.dh_id,
        dh_horas_planta: new FormControl(this.data.dh.dh_horas_planta, [Validators.required, Validators.min(0)]),
        dh_horas_hor: new FormControl(this.data.dh.dh_horas_hor, [Validators.required, Validators.min(0)]),
        dh_horas_total: 0,
        dh_docente: new FormControl(this.data.dh.dh_docente, [Validators.required]),
        dh_planificacion: new FormControl(this.data.dh.dh_planificacion, [Validators.required])

      });
    }
  }

  saveDH() {
    let dh = new DocenteHorasModel();
    dh = Object.assign(dh, this.form.value);
    dh.dh_horas_total = +dh.dh_horas_planta + +dh.dh_horas_hor;
    this.subs.push(
      this._doc_hr.crearDcHora(dh)
        .subscribe(
          res => this.dialogRef.close(),
          error => this._snack.open(error.error.detail, 'OK', { duration: 3000 }),
        )
    );


  }
  updateDH() {
    let dh = new DocenteHorasModel();
    dh = Object.assign(dh, this.form.value);
    dh.dh_horas_total = +dh.dh_horas_planta + +dh.dh_horas_hor;
    this.subs.push(
      this._doc_hr.updateDcHora(dh, dh.dh_id)
        .subscribe(
          res => this.dialogRef.close(),
          error => this._snack.open(error.error.detail, 'OK', { duration: 3000 }),
        )
    );

  }

}
