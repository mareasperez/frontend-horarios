import { Component, OnInit, HostBinding, Inject, OnDestroy } from '@angular/core';
import { CarreraModel } from 'src/app/models/carrera.model';
import { DepartamentoModel } from 'src/app/models/departamento.model';
import { Subscription, Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CarreraService } from 'src/app/services/carrera.service';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { matErrorsMessage } from 'src/app/utils/errors';

interface DialogData {
  type: string;
  car?: CarreraModel;
  departamentos: DepartamentoModel[];
}
@Component({
  selector: 'app-addcarrera',
  templateUrl: './addcarrera.component.html',
  styleUrls: ['./addcarrera.component.scss']
})
export class AddcarreraComponent implements OnInit, OnDestroy {
  @HostBinding('class') classes = 'row';
  public carrera = new CarreraModel();
  public departamentos: DepartamentoModel[] = [];
  edit = false;
  subs: Subscription[] = [];
  public selected = '0';
  public form: FormGroup;
  public refDepartamento: Observable<any>;
  public Errors: matErrorsMessage = new matErrorsMessage();
  // tslint:disable: variable-name
  constructor(
    private carreraService: CarreraService,
    private departamento$: DepartamentoService,
    public dialogRef: MatDialogRef<AddcarreraComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private _snack: MatSnackBar
  ) {
    this.departamentos = this.data.departamentos;
    this.refDepartamento = this.departamento$.getList();
  }

  ngOnInit() {
    this.subs.push(
      this.refDepartamento
        .subscribe(
          deps => this.departamentos = deps,
          error => this._snack.open(error.message, 'OK', { duration: 3000 }),
        )
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
        carrera_id: null,
        carrera_nombre: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        carrera_departamento: new FormControl('', [Validators.required])
      });
    } else {
      this.form = this.fb.group({
        carrera_id: this.data.car.carrera_id,
        carrera_nombre: new FormControl(this.data.car.carrera_nombre, [Validators.required, Validators.maxLength(100)]),
        carrera_departamento: new FormControl(this.data.car.carrera_departamento, [Validators.required])
      });
    }
  }
  saveCarrera() {
    let car = new CarreraModel();
    car = Object.assign(car, this.form.value);
    this.subs.push(
      this.carreraService.crearCarrera(car)
        .subscribe(
          res => this.dialogRef.close(),
          error => this._snack.open(error.message, 'OK', { duration: 3000 }),
        )
    );
  }

  updateCarrera() {
    let car = new CarreraModel();
    car = Object.assign(car, this.form.value);
    console.log(car);
    this.subs.push(
      this.carreraService.updateCarrera(car, car.carrera_id)
        .subscribe(
          res => this.dialogRef.close(),
          error => this._snack.open(error.message, 'OK', { duration: 3000 }),
        )
    );
  }
}
