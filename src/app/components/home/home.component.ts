import { Component, OnInit, OnDestroy } from '@angular/core';
import { CarreraService } from 'src/app/services/carrera.service';
import { Subscription, Observable } from 'rxjs';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { PlanEstudioService } from 'src/app/services/plan-estudio.service';
import { PlanificacionService } from 'src/app/services/planificacion.service';
import { DepartamentoModel } from 'src/app/models/departamento.model';
import { CarreraModel } from 'src/app/models/carrera.model';
import { PlanEstudioModel } from 'src/app/models/planEstudio';
import { PlanificacionModel } from 'src/app/models/planificacion.model';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { getItemLocalCache, setItemLocalCache } from 'src/app/utils/utils';
import { TitleService } from 'src/app/services/title.service';
import { JwtService } from 'src/app/services/jwt.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
// tslint:disable: variable-name
export class HomeComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];
  public showMessage = false;
  public departamentos: DepartamentoModel[] = [];
  public carreras: CarreraModel[] = [];
  public pdes: PlanEstudioModel[] = [];
  public planificaciones: PlanificacionModel[] = [];
  //  obserbables
  public refDep: Observable<any>;
  public refPla: Observable<any>;
  public refPde: Observable<any>;
  public refCarrera: Observable<any>;
  public isLoaded = false;
  private promesas: Promise<any>[] = [];
  public planSelected = getItemLocalCache('planificacion') ? getItemLocalCache('planificacion') : '-1';

  public form: FormGroup;
  constructor(
    private _carrera: CarreraService,
    private _dep: DepartamentoService,
    private _pde: PlanEstudioService,
    private _plan: PlanificacionService,
    private fb: FormBuilder,
    private _snack: MatSnackBar,
    private _title: TitleService,
    private _JwtService: JwtService
  ) {
    this._title.setTitle('Inicio');
    this.promesas.push(new Promise((resolve) => {
      const sub = this._carrera.getCarrera()
        .subscribe(
          res => this.carreras.push(res),
          error => this._snack.open(error.message, 'OK', { duration: 3000 }),
          () => resolve()
        );
      this.subs.push(sub);
    }));
    this.promesas.push(new Promise((resolve) => {
      const sub = this._dep.getDepartamento()
        .subscribe(
          res => this.departamentos.push(res),
          error => this._snack.open(error.message, 'OK', { duration: 3000 }),
          () => resolve()
        );
      this.subs.push(sub);
    }));
    this.promesas.push(new Promise((resolve) => {
      const sub = this._plan.getPlanificaciones()
        .subscribe(
          res => this.planificaciones.push(res),
          error => this._snack.open(error.message, 'OK', { duration: 3000 }),
          () => resolve()
        );
      this.subs.push(sub);
    }));
    this.promesas.push(new Promise((resolve) => {
      const sub = this._pde.getPlanEstudio()
        .subscribe(
          res => this.pdes.push(res),
          error => this._snack.open(error.message, 'OK', { duration: 3000 }),
          () => resolve()
        );
      this.subs.push(sub);
    }));

    this.refDep = this._dep.getList();
    this.refPde = this._pde.getList();
    this.refPla = this._plan.getList();
    this.refCarrera = this._carrera.getList();

  }

  ngOnInit() {
    Promise.all(this.promesas).then(() => {
      if (this.carreras.length > 0 && this.planificaciones.length > 0 && this.pdes.length > 0) {
        this.isLoaded = true;
        this.createForm();
        this._carrera.successObten();
        this.subs.push(this.refPde.subscribe(data => this.pdes = data));
        this.subs.push(this.refCarrera.subscribe(data => this.carreras = data));
        this.subs.push(this.refDep.subscribe(data => this.departamentos = data));
        this.subs.push(this.refPla.subscribe(data => this.planificaciones = data));
      } else {
        this.showMessage = true;
      }
    });

  }

  ngOnDestroy() {
    this._carrera.list = [];
    this._dep.list = [];
    this._plan.list = [];
    this._pde.list = [];
    this.subs.map(sub => {
      sub.unsubscribe();
    });
  }

  createForm() {
    this.form = this.fb.group({
      carrera: new FormControl(getItemLocalCache('carrera')),
      // departamento: new FormControl(getItemLocalCache("departamento")),
      departamento: new FormControl({ value: this._dep.list[0].departamento_id, disabled: true }),
      pde: new FormControl(getItemLocalCache('pde')),
      planificacion: new FormControl(getItemLocalCache('planificacion')),
      ciclo: new FormControl({ value: getItemLocalCache('ciclo'), disabled: this.planSelected !== '-1' ? false : true })
    });
  }

  save() {
    const keys = Object.keys(this.form.controls);
    keys.forEach(key => {
      switch (key) {
        case 'carrera':
          localStorage.setItem('carrera', this.form.controls[key].value);
          break;
        case 'departamento':
          localStorage.setItem('departamento', this.form.controls[key].value);
          break;
        case 'pde':
          localStorage.setItem('pde', this.form.controls[key].value);
          break;
        case 'planificacion':
          localStorage.setItem('planificacion', this.form.controls[key].value);
          break;
        case 'ciclo':
          localStorage.setItem('ciclo', this.form.controls[key].value);
          break;
      }
    });
  }
  clear() {
    const access = this._JwtService.Token;
    localStorage.clear();
    setItemLocalCache('access', access);
  }

}
