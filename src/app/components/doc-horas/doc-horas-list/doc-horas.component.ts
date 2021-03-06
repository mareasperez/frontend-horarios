import { Component, OnInit, OnDestroy } from '@angular/core';
import { DocenteHorasService } from 'src/app/services/docente-horas.service';
import { DocenteHorasModel } from 'src/app/models/docente.horas.model';
import { DocenteService } from 'src/app/services/docente.service';
import { PlanificacionService } from 'src/app/services/planificacion.service';
import { PlanificacionModel } from 'src/app/models/planificacion.model';
import { DocenteModel } from 'src/app/models/docente.model';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DocHorasAddComponent } from '../doc-horas-add/doc-horas-add.component';
import { Title } from '@angular/platform-browser';
import { setItemLocalCache, getItemLocalCache } from 'src/app/utils/utils';
import { RedirIfFailPipe } from 'src/app/pipes/redir-if-fail.pipe';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-doc-horas',
  templateUrl: './doc-horas.component.html',
  styleUrls: ['./doc-horas.component.scss']
})
// tslint:disable: variable-name
export class DocHorasComponent implements OnInit, OnDestroy {
  public dhs: DocenteHorasModel[] = [];
  public planificaciones: PlanificacionModel[] = [];
  public docentes: DocenteModel[] = [];
  public docs: DocenteModel[] = [];
  public isLoaded: boolean;
  private refPlan: Observable<any>;
  private refDoc: Observable<any>;
  private refDH: Observable<any>;
  public selectedPlan: PlanificacionModel;
  private subs: Subscription[] = [];
  dataSourceFiltered: DocenteHorasModel[] = [];
  displayedColumns: string[] = ['docente', 'horas_planta', 'horas_extras', 'total', 'opciones'];
  private promesas: Promise<any>[] = [];
  constructor(
    private _title: Title,
    private _doc_hr: DocenteHorasService,
    private _docente: DocenteService,
    private _planificacion: PlanificacionService,
    private dialog: MatDialog,
    private _snack: MatSnackBar,
    private router: Router

  ) {
    this._title.setTitle('Docente Horas');
    this.promesas.push(new Promise((resolve, reject) => {
      const sub = this._doc_hr.getDcHoras()
        .subscribe(
          res => this.dhs.push(res),
          error => this._snack.open(error.error.detail, 'OK', { duration: 3000 }),
          () => resolve()
        );
      this.subs.push(sub);

    }));

    this.promesas.push(new Promise((resolve, reject) => {
      const sub = this._docente.getDocente()
        .subscribe(
          res => this.docentes.push(res),
          error => this._snack.open(error.error.detail, 'OK', { duration: 3000 }),
          () => resolve()
        );
      this.subs.push(sub);
    }));

    this.promesas.push(new Promise((resolve, reject) => {
      const sub = this._planificacion.getPlanificaciones()
        .subscribe(
          res => this.planificaciones.push(res),
          error => this._snack.open(error.error.detail, 'OK', { duration: 3000 }),
          () => resolve()
        );
      this.subs.push(sub);
    }));
    this.refDoc = this._docente.getList();
    this.refPlan = this._planificacion.getList();
    this.refDH = this._doc_hr.getList();
  }

  ngOnInit() {

    Promise.all(this.promesas).then(res => {
      if (new RedirIfFailPipe().transform('/planificacion/ver', this.planificaciones, this.router)) {

        this._docente.successObten();
        this.selectedPlan = this.planificaciones.find(plan => plan.planificacion_id === getItemLocalCache('planificacion'));
        if (!this.selectedPlan) {
          console.log('no existe planificacion en localStorage, seteando');
          setItemLocalCache('planificacion', this.planificaciones[0].planificacion_id);
          this.selectedPlan = this.planificaciones[0];
        }
        this.subs.push(this.refDoc.subscribe(data => {
          this.docentes = [];
          this.docentes = data;
        }));
        this.subs.push(this.refPlan.subscribe(data => {
          this.planificaciones = [];
          this.planificaciones = data;
        }));
        this.subs.push(this.refDH.subscribe(data => {
          this.dhs = [];
          this.dhs = data;
          this.getData();
        }));
        this.getData();
        this.isLoaded = true;
      }
    });
  }
  ngOnDestroy() {
    this._doc_hr.list = [];
    this._docente.list = [];
    this._planificacion.list = [];
    this.subs.map(sub => sub.unsubscribe());
  }

  delDH(id) {
    this._doc_hr.deleteDcHora(id)
      .subscribe(
        res => console.log(res),
        (error: HttpErrorResponse) => { this._snack.open(error.error.detail, 'OK', { duration: 3000 }); },
      );
  }

  openDialog(tipo: string, docente?: DocenteModel, id?: string): void {
    console.log('tipo:', tipo, 'docente:', docente, 'id;', id);
    if (tipo === 'c') {
      this.dialog.open(DocHorasAddComponent, {
        width: '450px',
        data: { type: tipo, plani: this.selectedPlan, planificaciones: this.planificaciones, docentes: this.docs }
      });
    } else if (tipo === 'a') {
      this.dialog.open(DocHorasAddComponent, {
        width: '450px',
        data: { type: tipo, doc: docente, plani: this.selectedPlan, planificaciones: this.planificaciones, docentes: this.docentes }
      });
    }
    else {
      const dho = this.dhs.find(dh => dh.dh_id === Number(id));
      console.log('dh: ', dho);
      this.dialog.open(DocHorasAddComponent, {
        width: '450px',
        data: { type: tipo, dh: dho, planificaciones: this.planificaciones, docentes: this.docentes }
      });
    }
  }

  getDocenteName(id) {
    return this.docentes.find(doc => doc.docente_id === id).docente_nombre;

  }

  getPlanificacion(id) {
    const plan = this.planificaciones.find(p => p.planificacion_id === id);
    return `semetre ${plan.planificacion_semestre} | ${plan.planificacion_anyo_lectivo}`;
  }

  getData() {
    this.dataSourceFiltered = [];
    this.docs = [];
    this.dataSourceFiltered = this.dhs.filter(dh => dh.dh_planificacion === this.selectedPlan.planificacion_id);
    console.log(this.dataSourceFiltered);
    this.docentes.map(doc => {
      if (!this.dataSourceFiltered.find(d => d.dh_docente === doc.docente_id)) {
        this.docs.push(doc);
      }
    });
  }
}
