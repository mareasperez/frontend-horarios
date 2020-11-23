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
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { getItemLocalCache, setItemLocalCache } from 'src/app/utils/utils';
import { TitleService } from 'src/app/services/title.service';
import { JwtService } from 'src/app/services/jwt.service';
import { matErrorsMessage } from 'src/app/utils/errors';
import { FacultadSerivice } from 'src/app/services/facultad.service';
import { FacultadModel } from 'src/app/models/facultad.model';
import { AdddepartamentoComponent } from '../departamento/adddepartamento/adddepartamento.component';
import { AddcarreraComponent } from '../carrera/addcarrera/addcarrera.component';
import { AddplanestudioComponent } from '../planestudio/addplanestudio/addplanestudio.component';
import { AddPlanificacionComponent } from '../planificacion/add-planificacion/add-planificacion.component';
import { RecintoService } from 'src/app/services/recinto.service';
import { RecintoModel } from 'src/app/models/recinto.model';
import { AddrecintoComponent } from '../recinto/addrecinto/addrecinto.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
// tslint:disable: variable-name
export class HomeComponent implements OnInit, OnDestroy {
  public Errors: matErrorsMessage = new matErrorsMessage();
  private SIZE = (100 / 6);
  private subs: Subscription[] = [];
  public showMessage = false;
  public prepared = false;
  public departamentos: DepartamentoModel[] = [];
  public carreras: CarreraModel[] = [];
  public recintos: RecintoModel[] = [];
  public pdes: PlanEstudioModel[] = [];
  public planificaciones: PlanificacionModel[] = [];
  public progreso = 0;
  //  obserbables
  public refDep: Observable<any>;
  public refPla: Observable<any>;
  public refRec: Observable<any>;
  public refPde: Observable<any>;
  public refFac: Observable<any>;
  public refCarrera: Observable<any>;
  public isLoaded = false;
  private promesas: Promise<any>[] = [];
  public planSelected = getItemLocalCache('planificacion') ? getItemLocalCache('planificacion') : '-1';
  public selectedCar = getItemLocalCache('carrera') ? getItemLocalCache('carrera') : null;
  public facultades: FacultadModel[] = [];
  public form: FormGroup;
  public formFac: FormGroup;
  constructor(
    private _carrera: CarreraService,
    private _dep: DepartamentoService,
    private _pde: PlanEstudioService,
    private _recinto: RecintoService,
    private _plan: PlanificacionService,
    private fb: FormBuilder,
    private _snack: MatSnackBar,
    private _title: TitleService,
    private _JwtService: JwtService,
    private _facultad: FacultadSerivice,
    private dialog: MatDialog,

  ) {
    this._title.setTitle('Inicio');
    this.promesas.push(new Promise((resolve) => {
      const sub = this._facultad.getFacultad()
        .subscribe(
          res => { this.facultades.push(res); },
          error => this._snack.open(error.message, 'OK', { duration: 3000 }),
          () => { resolve(); this.alterProgres('i', this.facultades.length); }
        );
      this.subs.push(sub);
    }));
    this.promesas.push(new Promise((resolve) => {
      const sub = this._carrera.getCarrera()
        .subscribe(
          res => { this.carreras.push(res); },
          error => this._snack.open(error.message, 'OK', { duration: 3000 }),
          () => { resolve(); this.alterProgres('i', this.carreras.length); }
        );
      this.subs.push(sub);
    }));
    this.promesas.push(new Promise((resolve) => {
      const sub = this._dep.getDepartamento()
        .subscribe(
          res => { this.departamentos.push(res); },
          error => this._snack.open(error.message, 'OK', { duration: 3000 }),
          () => { resolve(); this.alterProgres('i', this.departamentos.length); }
        );
      this.subs.push(sub);
    }));
    this.promesas.push(new Promise((resolve) => {
      const sub = this._recinto.getRecinto()
        .subscribe(
          res => { this.recintos.push(res); },
          error => this._snack.open(error.message, 'OK', { duration: 3000 }),
          () => { resolve(); this.alterProgres('i', this.recintos.length); }
        );
      this.subs.push(sub);
    }));
    this.promesas.push(new Promise((resolve) => {
      const sub = this._plan.getPlanificaciones()
        .subscribe(
          res => { this.planificaciones.push(res); },
          error => this._snack.open(error.message, 'OK', { duration: 3000 }),
          () => { resolve(); this.alterProgres('i', this.planificaciones.length); }
        );
      this.subs.push(sub);
    }));
    this.promesas.push(new Promise((resolve) => {
      const sub = this._pde.getPlanEstudio()
        .subscribe(
          res => { this.pdes.push(res); },
          error => this._snack.open(error.message, 'OK', { duration: 3000 }),
          () => { resolve(); this.alterProgres('i', this.pdes.length); }
        );
      this.subs.push(sub);
    }));
    this.refFac = this._facultad.getList();
    this.refDep = this._dep.getList();
    this.refPde = this._pde.getList();
    this.refPla = this._plan.getList();
    this.refRec = this._recinto.getList();
    this.refCarrera = this._carrera.getList();

  }

  ngOnInit() {
    Promise.all(this.promesas).then(() => {
      this.isLoaded = true;
      if (
        this.facultades.length > 0
        && this.carreras.length > 0
        && this.planificaciones.length > 0
        && this.pdes.length > 0
        && this.departamentos.length > 0
        && this.recintos.length > 0) {
        this.createForm();
        this._carrera.successObten();
      } else {
        this.showMessage = true;
        this.firstUse();
      }
      this.subs.push(this.refPde.subscribe(data => {
        const len = this.pdes.length;
        this.pdes = data;
        if (this.pdes.length === 0) { this.alterProgres('d'); }
        if (this.pdes.length === 1) { if (len < 2) { this.alterProgres('c'); } }
      }));
      this.subs.push(this.refCarrera.subscribe(data => {
        const len = this.carreras.length;
        this.carreras = data;
        if (this.carreras.length === 0) { this.alterProgres('d'); }
        if (this.carreras.length === 1) { if (len < 2) { this.alterProgres('c'); } }
      }));
      this.subs.push(this.refDep.subscribe(data => {
        const len = this.departamentos.length;
        this.departamentos = data;
        if (this.departamentos.length === 0) { this.alterProgres('d'); }
        if (this.departamentos.length === 1) { if (len < 2) { this.alterProgres('c'); } }
      }));
      this.subs.push(this.refPla.subscribe(data => {
        const len = this.planificaciones.length;
        this.planificaciones = data;
        if (this.planificaciones.length === 0) { this.alterProgres('d'); }
        if (this.planificaciones.length === 1) { if (len < 2) { this.alterProgres('c'); } }

      }));
      this.subs.push(this.refRec.subscribe(data => {
        const len = this.recintos.length;
        this.recintos = data;
        if (this.recintos.length === 0) { this.alterProgres('d'); }
        if (this.recintos.length === 1) { if (len < 2) { this.alterProgres('c'); } }
      }));
      this.subs.push(this.refFac.subscribe(data => {
        const len = this.facultades.length;
        this.facultades = data;
        if (this.facultades.length === 0) { this.alterProgres('d'); }
        if (this.facultades.length === 1) { if (len < 2) { this.alterProgres('c'); } }
      }));
    });
  }

  ngOnDestroy() {
    this._carrera.list = [];
    this._dep.list = [];
    this._plan.list = [];
    this._pde.list = [];
    this._recinto.list = [];
    this.subs.map(sub => {
      sub.unsubscribe();
    });
  }
  get FormFac() {
    return this.formFac.controls;
  }
  get Form() {
    return this.form.controls;
  }
  filterPde(): PlanEstudioModel[] {
    const pd = this.pdes.filter(pde => pde.pde_carrera === this.selectedCar);
    pd.length === 0 ? this.Form.pde.disable() : this.Form.pde.enable();
    return pd;
  }
  cicloEnable() {
    this.Form.ciclo.enable();
  }
  createForm() {
    this.form = this.fb.group({
      carrera: new FormControl(this.selectedCar),
      // departamento: new FormControl(getItemLocalCache("departamento")),
      departamento: new FormControl({ value: this._dep.list[0].departamento_id, disabled: true }),
      pde: new FormControl({ value: getItemLocalCache('pde'), disabled: this.selectedCar == null ? true : false }),
      planificacion: new FormControl(getItemLocalCache('planificacion')),
      ciclo: new FormControl({ value: getItemLocalCache('ciclo'), disabled: this.planSelected !== '-1' ? false : true })
    });
  }
  firstUse() {
    this.formFac = this.fb.group({
      facultad_nombre: new FormControl({
        value: this.facultades[0] ? this.facultades[0].facultad_nombre : '',
        disabled: this.facultades.length > 0
      },
        [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
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
  crearFacultad() {
    let fac = new FacultadModel();
    fac = Object.assign(fac, this.formFac.value);
    this._facultad.crearFacultad(fac).subscribe(res => this.facultades.push(res));
  }
  clear() {
    const access = this._JwtService.Token;
    localStorage.clear();
    setItemLocalCache('access', access);
  }
  openDep(): void {
    this.dialog.open(AdddepartamentoComponent, {
      width: '450px',
      data: { type: 'c' }
    });
  }
  openCar(): void {
    this.dialog.open(AddcarreraComponent, {
      width: '450px',
      data: { type: 'c', departamentos: this.departamentos }
    });
  }
  openRec(): void {
    this.dialog.open(AddrecintoComponent, {
      width: '450px',
      data: { type: 'c' }
    });
  }
  openPde(): void {
    this.dialog.open(AddplanestudioComponent, {
      width: '450px',
      data: { type: 'c' }
    });
  }
  openPlan(): void {
    this.dialog.open(AddPlanificacionComponent, {
      width: '450px',
      data: { type: 'c' }
    });
  }
  alterProgres(tipo: string, len?: number) {
    if (tipo === 'c') {
      this.progreso += this.SIZE;
    } else if (tipo === 'd') {
      this.progreso -= this.SIZE;
    }
    else if (tipo === 'i') {
      if (len > 0) { this.progreso += this.SIZE; }
    }
    console.log('llamada tipo:', tipo, ' ', this.progreso);
  }
}
