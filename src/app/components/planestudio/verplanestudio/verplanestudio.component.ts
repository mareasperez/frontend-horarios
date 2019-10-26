import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlanEstudioModel } from 'src/app/models/planEstudio';
import { PlanEstudioService } from 'src/app/services/plan-estudio.service';
import { MatDialog } from '@angular/material';
import { AddplanestudioComponent } from '../addplanestudio/addplanestudio.component';
import { Observable, Subscription } from 'rxjs';
import { CarreraModel } from 'src/app/models/carrera.model';
import { CarreraService } from 'src/app/services/carrera.service';

@Component({
  selector: 'app-verplanestudio',
  templateUrl: './verplanestudio.component.html',
  styleUrls: ['./verplanestudio.component.scss']
})
export class VerplanestudioComponent implements OnInit, OnDestroy {

  public pde: PlanEstudioModel[] = [];
  public alerts = true;
  public dataSource;
  public carreras: CarreraModel[] = [];
  private subs: Subscription[] = [];
  public refPde: Observable<any>;
  displayedColumns: string[] = ['id', 'nombre', 'anyo', 'carrera', 'opciones'];
  socket: WebSocket;
  constructor(
    // tslint:disable: no-shadowed-variable
    // tslint:disable: variable-name
    private _pde: PlanEstudioService,
    private _Carrera: CarreraService,
    private dialog: MatDialog

  ) {
    const p = new Promise<any>((resolve, reject) => {
      this._Carrera.getCarrera().subscribe(
        res => this.carreras.push(res)
      );
    });

    this.subs.push(this._pde.getPlanEstudio()
      .subscribe(plan => {
        this.pde.push(plan);
        this.dataSource = this.pde;
      })
    );
    this.refPde = this._pde.getList();
  }

  ngOnInit() {
    this.subs.push(
      this.refPde.subscribe(data => {
        this.dataSource = [];
        this.pde = data;
        data.map(p => {
          this.dataSource.push(p);
        });
      })
    );
  }

  ngOnDestroy() {
    this._pde.list = [];
    this.subs.map(sub => sub.unsubscribe());
  }

  deletePlanEstudio(id: number) {
    this.subs.push(
      this._pde.deletePde(id)
        .subscribe(
          res => {
            this.dataSource = this.dataSource.filter(p => p.pde_id !== id);
          },
          err => console.log(err)
        )
    );
  }

  openDialog(tipo, id?): void {
    if (tipo === 'c') {
      const dialogRef = this.dialog.open(AddplanestudioComponent, {
        width: '450px',
        data: { type: tipo }
      });
    } else {

      const pde = this.pde.find(p => p.pde_id === id);
      const dialogRef = this.dialog.open(AddplanestudioComponent, {
        width: '450px',
        data: { type: tipo, plan: pde }
      });
    }
  }

}
