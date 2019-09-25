import { Component, OnInit, OnDestroy } from '@angular/core';
import { GrupoService } from 'src/app/services/grupo.service';
import { GrupoModel } from 'src/app/models/grupo.model';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ComponenteModel } from 'src/app/models/componente.model';
import { ComponenteService } from 'src/app/services/componente.service';
import { PlanificacionService } from 'src/app/services/planificacion.service';
import { PlanEstudioModel } from 'src/app/models/planEstudio';
import { PlanificacionModel } from 'src/app/models/planificacion.model';
import { DocenteService } from 'src/app/services/docente.service';
import { DocenteModel } from 'src/app/models/docente.model';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.scss']
})
export class GrupoComponent implements OnInit, OnDestroy {
  public ref: Observable<any[]>;
  public refComp: Observable<any[]>;
  public refPlan: Observable<any[]>;
  public refDoc: Observable<any[]>;
  // arrays de datos
  public grupos: GrupoModel[] = [];
  public componentes: ComponenteModel[] = [];
  public planificaciones: PlanificacionModel[] = [];
  public docentes: DocenteModel[] = [];
  // creacion del formGroup
  public form: FormGroup;
  public selected = '0';
  public selected2 = '0';
  // validacion de edicion o creacion
  public add = false;
  public editing = false;
  subs:Subscription[]=[]

  constructor(
    private fb: FormBuilder,
    private _grupo: GrupoService,
    private _componente: ComponenteService,
    private _planificacion: PlanificacionService,
    private _docente: DocenteService
  ) {
    this.subs.push(
      this._grupo.getGrupos()
        .subscribe(res => this.grupos.push(res)));

    this.subs.push(
      this._componente.getComponentes()
        .subscribe(res => this.componentes.push(res)));

    this.subs.push(
      this._planificacion.getPlanificaciones()
        .subscribe(res => this.planificaciones.push(res)));

    this.subs.push(
      this._docente.getDocente()
        .subscribe(res => this.docentes.push(res)));

    this.ref = this._grupo.getList();
    this.refComp = this._componente.getList();
    this.refPlan = this._planificacion.getList();
    this.refDoc = this._docente.getList();
  }

  ngOnInit() {
    this.ref.subscribe(data => {
    this.grupos = data;
    console.log('la data es: ', data);
    });
    this.refComp.subscribe(data => this.componentes = data);
    this.refPlan.subscribe(data => this.planificaciones = data);
    this.refDoc.subscribe(data => this.docentes = data);
    // this.createForm();

  }

  ngOnDestroy(){
    this._componente.list = []
    this._docente.list = []
    this._grupo.list = []
    this._planificacion.list = []
    this.subs.map(sub=>sub.unsubscribe())

  }


  createForm(flag: number, id?: number) {
    if (flag === 0) {
      this.form = this.fb.group({
        grupo_id: null,
        grupo_numero: new FormControl('', [Validators.required, Validators.min(1)]),
        grupo_max_capacidad: new FormControl('', [Validators.required, Validators.min(20)]),
        grupo_tipo: new FormControl('', [Validators.required, Validators.min(1)]),
        grupo_horas_clase: new FormControl('', [Validators.required, Validators.min(1)]),
        grupo_modo: new FormControl('', [Validators.required]),
        grupo_componente: new FormControl('', [Validators.required]),
        grupo_docente: new FormControl('', [Validators.required]),
        grupo_planificacion: new FormControl('', [Validators.required]),
        grupo_planta: new FormControl(false, [Validators.required])

      });
    } else {
      const grupo = this.grupos.find(el => el.grupo_id === id);
      console.log(grupo);
      this.form = this.fb.group({
        grupo_id: new FormControl(grupo.grupo_id),
        grupo_numero: new FormControl(grupo.grupo_numero, [Validators.required, Validators.min(1)]),
        grupo_max_capacidad: new FormControl(grupo.grupo_max_capacidad, [Validators.required, Validators.min(20)]),
        grupo_tipo: new FormControl(grupo.grupo_tipo, [Validators.required, Validators.min(1)]),
        grupo_horas_clase: new FormControl(grupo.grupo_horas_clase, [Validators.required, Validators.min(1)]),
        grupo_modo: new FormControl(grupo.grupo_modo, [Validators.required]),
        grupo_componente: new FormControl(grupo.grupo_componente, [Validators.required]),
        grupo_docente: new FormControl(grupo.grupo_docente, [Validators.required]),
        grupo_planificacion: new FormControl(grupo.grupo_planificacion, [Validators.required]),
        grupo_planta: new FormControl(grupo.grupo_planta, [Validators.required])

      });

    }
    this.add = true;
  }
  saveGrupo(flag: number) {
    if (flag === 0) {
      this.createGrupo();
    } else {
      this.editGrupo(this.form.value.grupo_id);
    }

  }
  createGrupo() {
    this.editing = true;
    let grupo = new GrupoModel();
    grupo = Object.assign(grupo, this.form.value);
    console.log(grupo);
    this._grupo.crearGrupo(grupo).subscribe(res => {
      this.editing = false;
      this.add = false;
    });
  }
  delGrupo(e: number) {
    this._grupo.deleteGrupo(e).subscribe();
  }
  editGrupo(id: number) {
    this.editing = true;
    this._grupo.updategrupo(this.form.value, id).subscribe(res => {
      this.form.reset();
      this.editing = false;
      this.add = false;
    });
  }
}
