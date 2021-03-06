import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ComponenteService } from 'src/app/services/componente.service';
import { ComponenteModel } from 'src/app/models/componente.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { matErrorsMessage } from 'src/app/utils/errors';
import { AreaService } from 'src/app/services/area.service';
import { PlanEstudioService } from 'src/app/services/plan-estudio.service';
import { PlanEstudioModel } from 'src/app/models/planEstudio';
import { AreaModel } from 'src/app/models/area.model';
import { Subscription, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
interface DialogData {
  type: string;
  pde?: PlanEstudioModel;
  componente?: ComponenteModel;
  ciclo?: string;
  areas: AreaModel[];
  pdes: PlanEstudioModel[];
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
  public refAreas: Observable<any>;
  public refPdes: Observable<any>;
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
    console.log(this.data.areas);
    this.pdes = this.data.pdes;
    this.areas = this.data.areas;
    this.refAreas = this._area.getList();
    this.refPdes = this._pde.getList();
  }

  ngOnInit() {
    this.refAreas.subscribe(
      res => { this.areas = []; this.areas = res; },
      error => this._snack.open(error.error.detail, 'OK', { duration: 3000 }),
    );
    this.refPdes.subscribe(
      pd => this.pdes = pd,
      error => this._snack.open(error.error.detail, 'OK', { duration: 3000 }),
    );
    this.createForm();
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  createForm(id?: string) {
    console.log(this.data.pde);
    if (this.data.type === 'c') {
      this.form = this.fb.group({
        componente_id: null,
        componente_nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
        componente_chp: new FormControl('0', [Validators.required, Validators.min(0)]),
        componente_cht: new FormControl('4', [Validators.required, Validators.min(0)]),
        componente_ciclo: new FormControl(this.data.ciclo ? this.data.ciclo : '0', [Validators.required, Validators.min(1)]),
        componente_credito: new FormControl('1', [Validators.required, Validators.min(1), Validators.max(10)]),
        componente_area: new FormControl('', [Validators.required]),
        componente_pde: new FormControl(this.data.pde.pde_id, [Validators.required])

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
        (error: HttpErrorResponse) => this._snack.open(error.error.detail, 'OK', { duration: 3000 })
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
        (error: HttpErrorResponse) => this._snack.open(error.error.detail, 'OK', { duration: 3000 })
      );
    this.subs.push(sub);

  }

  get Form() {
    return this.form.controls;
  }

}
