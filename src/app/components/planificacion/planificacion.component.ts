import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { PlanificacionService } from 'src/app/services/planificacion.service';
import { PlanificacionModel } from 'src/app/models/planificacion.model';
import { Observable, Subscription } from 'rxjs';
import { AddPlanificacionComponent } from './add-planificacion/add-planificacion.component';


@Component({
  selector: 'app-planificacion',
  templateUrl: './planificacion.component.html',
  styleUrls: ['./planificacion.component.scss']
})
// tslint:disable: variable-name
export class PlanificacionComponent implements OnInit, OnDestroy {
  public planificaciones: PlanificacionModel[] = [];
  refPla: Observable<any>;
  subs: Subscription[] = [];
  public visible: boolean;
  private p1: Promise<any>;
  public dataSource = [];
  displayedColumns: string[] = ['id', 'nombre', 'opciones'];
  constructor(
    private _planificacion: PlanificacionService,
    private dialog: MatDialog,
    private _snack: MatSnackBar
  ) {

    this.p1 = new Promise((resolve, reject) => {
      const sub = this._planificacion.getPlanificaciones()
        .subscribe(
          res => this.planificaciones.push(res),
          error => this._snack.open(error.message, 'OK', { duration: 3000 }),
          () => resolve()
        );
      this.subs.push(sub);
      this.dataSource = this.planificaciones;
    });

    this.refPla = this._planificacion.getList();
  }

  ngOnInit() {
    this.p1.then(() => {
      this.visible = true;
      this._planificacion.successObten();
      this.subs.push(
      );
    });
    this.refPla.subscribe(data => {
      console.log(data);
      this.planificaciones = data;
      this.dataSource = [];
      this.planificaciones.forEach(dep => {
        this.dataSource.push(dep);
      });
    });

  }

  ngOnDestroy() {
    this._planificacion.list = [];
    this.subs.map(sub => sub.unsubscribe());
  }

  delPlan(id) {
    this._planificacion.deletePlanificacion(id)
      .subscribe(
        res => { },
        error => this._snack.open(error.message, 'OK', { duration: 3000 }),
      );
  }

  openDialog(tipo, id?): void {
    if (tipo === 'c') {
      this.dialog.open(AddPlanificacionComponent, {
        width: '450px',
        data: { type: tipo }
      });
    } else {

      const plan = this.planificaciones.find(p => p.planificacion_id === id);
      this.dialog.open(AddPlanificacionComponent, {
        width: '450px',
        data: { type: tipo, plan }
      });
    }
  }

}
