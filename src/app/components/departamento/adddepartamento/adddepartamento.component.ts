import { Component, OnInit, HostBinding, Inject, OnDestroy } from '@angular/core';
import { DepartamentoModel } from 'src/app/models/departamento.model';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { Subscription, Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FacultadSerivice } from 'src/app/services/facultad.service';
import { FacultadModel } from 'src/app/models/facultad.model';
import { matErrorsMessage } from 'src/app/utils/errors';

interface DialogData {
  type: string;
  dep?: DepartamentoModel;
}

@Component({
  selector: 'app-adddepartamento',
  templateUrl: './adddepartamento.component.html',
  styleUrls: ['./adddepartamento.component.scss']
})
export class AdddepartamentoComponent implements OnInit, OnDestroy {
  @HostBinding('class') classes = 'row';

  public departamento = new DepartamentoModel();
  public facultades: FacultadModel[] = [];
  edit = false;
  subs: Subscription[] = [];
  public selected = '0';
  public form: FormGroup;
  public refFacultad: Observable<any>;
  public Errors: matErrorsMessage = new matErrorsMessage();
  // tslint:disable: variable-name
  constructor(
    private departamentoService: DepartamentoService,
    private facultad$: FacultadSerivice,
    public dialogRef: MatDialogRef<AdddepartamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private _snack: MatSnackBar
  ) {
    const p = new Promise<void>(() => {
      this.facultad$.getFacultad()
        .subscribe(
          res => this.facultades.push(res),
          error => this._snack.open(error.message, 'OK', { duration: 3000 }),
        );
    });
    this.refFacultad = this.facultad$.getList();
  }

  ngOnInit() {
    this.subs.push(
      this.refFacultad.subscribe(facs => this.facultades = facs)
    );
    this.createForm();
  }

  ngOnDestroy() {
    this.subs.map(sub => sub.unsubscribe());
  }
  get Form() {
    return this.form.controls;
  }
  createForm(id?: string) {
    if (this.data.type === 'c') {
      this.form = this.fb.group({
        departamento_id: null,
        departamento_nombre: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        departamento_facultad: new FormControl('', [Validators.required])

      });
    } else {
      this.form = this.fb.group({
        departamento_id: this.data.dep.departamento_id,
        departamento_nombre: new FormControl(this.data.dep.departamento_nombre, [Validators.required, Validators.maxLength(100)]),
        departamento_facultad: new FormControl(this.data.dep.departamento_facultad, [Validators.required])
      });
    }
  }

  saveDepartamento() {
    let dep = new DepartamentoModel();
    dep = Object.assign(dep, this.form.value);
    console.log(dep);
    this.subs.push(
      this.departamentoService.crearDepartamento(dep)
        .subscribe(
          res => this.dialogRef.close(),
          error => this._snack.open(error.message, 'OK', { duration: 3000 }),
        )
    );
  }

  updateDepartamento() {
    let dep = new DepartamentoModel();
    dep = Object.assign(dep, this.form.value);
    console.log(dep);
    this.subs.push(
      this.departamentoService.updateDepartamento(dep, dep.departamento_id)
        .subscribe(
          res => this.dialogRef.close(),
          error => this._snack.open(error.message, 'OK', { duration: 3000 }),
        )
    );
  }

}
