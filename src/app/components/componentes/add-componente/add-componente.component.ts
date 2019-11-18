import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ComponenteService } from 'src/app/services/componente.service';
import { ComponenteModel } from 'src/app/models/componente.model';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { matErrorsMessage } from 'src/app/utils/errors';
import { AreaService } from 'src/app/services/area.service';
import { PlanEstudioService } from 'src/app/services/plan-estudio.service';
import { PlanEstudioModel } from 'src/app/models/planEstudio';
import { AreaModel } from 'src/app/models/area.model';
import { Subscription } from 'rxjs';
interface DialogData {
  type: string;
  pde?: string;
  componente?: ComponenteModel;
}
@Component({
  selector: 'app-add-componente',
  templateUrl: './add-componente.component.html',
  styleUrls: ['./add-componente.component.scss']
})
export class AddComponenteComponent implements OnInit, OnDestroy {
  public add = false;
  public editing = false;
  public form: FormGroup;
  public componentes: ComponenteModel[] = [];
  public pdes: PlanEstudioModel[] = [];
  public areas: AreaModel[] = [];
  public Errors: matErrorsMessage = new matErrorsMessage();
  private subs: Subscription[] = [];
  private promesas: Promise<any>[] = [];
  // tslint:disable: variable-name
  constructor(
    private comService: ComponenteService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<AddComponenteComponent>,
    private _pde: PlanEstudioService,
    private _area: AreaService,
    private _snack: MatSnackBar
  ) {
    const p1 = new Promise((resolve, reject) => {
      const sub = this._pde.getPlanEstudio()
        .subscribe(
          res => this.pdes.push(res),
          error => this._snack.open(error, 'OK', { duration: 3000 }),
          () => resolve()
        );
      this.subs.push(sub);
    });
    const p3 = new Promise((resolve, reject) => {
      const sub = this._area.getAreas()
        .subscribe(
          res => this.areas.push(res),
          error => this._snack.open(error, 'OK', { duration: 3000 }),
          () => resolve()
        );
      this.subs.push(sub);
    });
    this.promesas.push(p3, p1);
  }

  ngOnInit() {
    Promise.all(this.promesas).then(() => {
      this.createForm();
    });
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  createForm(id?: string) {
    if (this.data.type === 'c') {
      this.form = this.fb.group({
        componente_id: null,
        componente_nombre: new FormControl('', [Validators.required, Validators.minLength(5)]),
        componente_chp: new FormControl('2', [Validators.required, Validators.min(0)]),
        componente_cht: new FormControl('4', [Validators.required, Validators.min(0)]),
        componente_ciclo: new FormControl('0', [Validators.required, Validators.min(1)]),
        componente_credito: new FormControl('4', [Validators.required, Validators.min(1), Validators.max(4)]),
        componente_area: new FormControl('', [Validators.required]),
        componente_pde: new FormControl(this.data.pde, [Validators.required])

      });
    } else {

      this.form = this.fb.group({
        componente_id: this.data.componente.componente_id,
        componente_nombre: new FormControl(this.data.componente.componente_nombre, [Validators.required, Validators.minLength(5)]),
        componente_chp: new FormControl(this.data.componente.componente_chp, [Validators.required, Validators.min(0)]),
        componente_cht: new FormControl(this.data.componente.componente_cht, [Validators.required, Validators.min(0)]),
        componente_ciclo: new FormControl(this.data.componente.componente_ciclo, [Validators.required, Validators.min(1)]),
        componente_credito: new FormControl(
          this.data.componente.componente_credito, [Validators.required, Validators.min(1), Validators.max(4)]),
        componente_area: new FormControl(this.data.componente.componente_area, [Validators.required]),
        componente_pde: new FormControl(this.data.componente.componente_pde, [Validators.required])

      });
    }
    this.add = true;
  }


  saveComponente(flag: number) {
    flag === 0 ? this.createComponente() : this.editComponente(this.form.value.componente_id);
  }

  createComponente() {
    this.editing = true;
    let comp = new ComponenteModel();
    comp = Object.assign(comp, this.form.value);
    const sub = this.comService.crearComponente(comp)
      .subscribe(
        res => {
          this.editing = false;
          this.add = false;
          this.dialogRef.close();
        },
        error => this._snack.open(error, 'OK', { duration: 3000 })

      );
    this.subs.push(sub);

  }

  editComponente(id: string) {
    this.editing = true;
    const sub = this.comService.updateComponente(this.form.value, id)
      .subscribe(
        res => {
          this.form.reset();
          this.editing = false;
          this.add = false;
          this.dialogRef.close();
        },
        error => this._snack.open(error, 'OK', { duration: 3000 })
      );
    this.subs.push(sub);

  }

  get Form() {
    return this.form.controls;
  }

}
