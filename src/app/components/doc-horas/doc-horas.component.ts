import { Component, OnInit, OnDestroy } from '@angular/core';
import { DocenteHorasService } from 'src/app/services/docente-horas.service';
import { DocenteHorasModel } from 'src/app/models/docente.horas.model';
import { DocenteService } from 'src/app/services/docente.service';
import { PlanificacionService } from 'src/app/services/planificacion.service';
import { PlanificacionModel } from 'src/app/models/planificacion.model';
import { DocenteModel } from 'src/app/models/docente.model';
import { Observable, Subscription } from 'rxjs';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DocHorasAddComponent } from '../doc-horas-add/doc-horas-add.component';

@Component({
  selector: 'app-doc-horas',
  templateUrl: './doc-horas.component.html',
  styleUrls: ['./doc-horas.component.scss']
})
export class DocHorasComponent implements OnInit, OnDestroy {
  public dhs: DocenteHorasModel[] = []
  public planificaciones: PlanificacionModel[] = []
  public docentes: DocenteModel[] = []
  private refPlan: Observable<any>
  private refDoc: Observable<any>
  private refDH: Observable<any>
  private subs: Subscription[] = []
  dataSource
  displayedColumns: string[] = ['docente', 'horas_planta', 'horas_extras', 'total', 'planificacion', 'opciones'];
  private promesas: Promise<any>[] = []
  constructor(private _doc_hr: DocenteHorasService,
    private _docente: DocenteService,
    private _planificacion: PlanificacionService,
    private dialog: MatDialog,
    private _snack: MatSnackBar

  ) {
    let p1 = new Promise((resolve, reject) => {
      let sub = this._doc_hr.getDcHoras()
        .subscribe(
          res => this.dhs.push(res),
          error => this._snack.open(error.message, "OK", { duration: 3000 }),
          () => resolve()
        );
      this.subs.push(sub)

    });

    let p2 = new Promise((resolve, reject) => {
      let sub = this._docente.getDocente()
        .subscribe(
          res => this.docentes.push(res),
          error => this._snack.open(error.message, "OK", { duration: 3000 }),
          () => resolve()
        );
      this.subs.push(sub)
    });

    let p3 = new Promise((resolve, reject) => {
      let sub = this._planificacion.getPlanificaciones()
        .subscribe(
          res => this.planificaciones.push(res),
          error => this._snack.open(error.message, "OK", { duration: 3000 }),
          () => resolve()
        );
      this.subs.push(sub)
    });

    this.promesas.push(p1, p2, p3)
    this.refDoc = this._docente.getList()
    this.refPlan = this._planificacion.getList()
    this.refDH = this._doc_hr.getList()
  }

  ngOnInit() {

    Promise.all(this.promesas).then(res => {
      this.dataSource = this.dhs;
      this._docente.successObten();
      this.subs.push(this.refDoc.subscribe(data => {
        this.docentes = [];
        this.docentes = data;
      }));

      this.subs.push(this.refPlan.subscribe(data => {
        this.planificaciones = [];
        this.planificaciones = data;
      }));

      this.subs.push(this.refDH.subscribe(data => {
        this.dataSource = [];
        this.dhs = data;
        data.map(dh => {
          this.dataSource.push(dh);
        });
      }));

    });
  }
  ngOnDestroy() {
    this._doc_hr.list = []
    this._docente.list = []
    this._planificacion.list = []
    this.subs.map(sub => sub.unsubscribe())
  }

  delDH(id) {
    this._doc_hr.deleteDcHora(id).subscribe(res => console.log(res))
  }

  openDialog(tipo, id?: string): void {
    if (tipo === 'c') {
      this.dialog.open(DocHorasAddComponent, {
        width: '450px',
        data: { type: tipo }
      });
    } else {
      let dh = this.dhs.find(dh => dh.dh_id === Number(id))
      this.dialog.open(DocHorasAddComponent, {
        width: '450px',
        data: { type: tipo, dh: dh }
      });
    }
  }

  getDocenteName(id) {
    return this.docentes.find(doc => doc.docente_id === id).docente_nombre

  }

  getPlanificacion(id) {
    let plan = this.planificaciones.find(plan => plan.planificacion_id === id)
    return `semetre ${plan.planificacion_semestre} | ${plan.planificacion_anyo_lectivo}`
  }

}
