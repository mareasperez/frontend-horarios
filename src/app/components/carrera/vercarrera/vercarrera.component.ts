import { Component, OnInit, OnDestroy } from '@angular/core';
import { CarreraModel } from 'src/app/models/carrera.model';
import { Observable, Subscription } from 'rxjs';
import { CarreraService } from 'src/app/services/carrera.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AddcarreraComponent } from '../addcarrera/addcarrera.component';
import { DepartamentoModel } from 'src/app/models/departamento.model';
import { DepartamentoService } from 'src/app/services/departamento.service';

@Component({
  selector: 'app-vercarrera',
  templateUrl: './vercarrera.component.html',
  styleUrls: ['./vercarrera.component.scss']
})
export class VercarreraComponent implements OnInit, OnDestroy {
  public carreras: CarreraModel[] = [];
  public departamentos: DepartamentoModel[] = [];
  public refDep: Observable<any[]>;
  public refCarrera: Observable<any>;
  public visible: boolean;
  private subs: Subscription[] = [];
  private promesas: Promise<any>[] = [];
  sub: Subscription;
  constructor(
    private carrera$: CarreraService,
    private departamento$: DepartamentoService,
    private dialog: MatDialog,
    private _snack: MatSnackBar
  ) {
    let p1 = new Promise((resolve) => {
      let sub = this.carrera$.getCarrera()
        .subscribe(
          res => this.carreras.push(res),
          error =>this._snack.open(error,"OK",{duration: 3000}),
          () => resolve()
        );
      this.subs.push(sub);

    });
    let p2 = new Promise((resolve) => {
      let sub = this.departamento$.getDepartamento()
        .subscribe(
          res => this.departamentos.push(res),
          error =>this._snack.open(error,"OK",{duration: 3000}),
          () => resolve()
        );
      this.subs.push(sub);

    });
    this.promesas.push(p1, p2);
    this.refCarrera = this.carrera$.getList();
    this.refDep = this.departamento$.getList();
  }

  async ngOnInit() {
    Promise.all(this.promesas).then(res => {
      this.visible = true;
    });
    this.refCarrera.subscribe(data => {
      console.log(data);
      this.carreras = data;
    });
  }
  ngOnDestroy() {
    this.carrera$.list = [];
    if (this.sub !== undefined) {
      this.sub.unsubscribe();
    }
  }

  delCarrera(id: any) {
    this.sub = this.carrera$.deleteCarrera(id)
    .subscribe(
      res=>{},
      error =>this._snack.open(error.message,"OK",{duration: 5000}),
    );
  }

  openDialog(tipo: string, id?: any): void {
    if (tipo === 'c') {
      this.dialog.open(AddcarreraComponent, {
        width: '450px',
        data: { type: tipo }
      });
    } else {
      let carrera = this.carreras.find(d => d.carrera_id === id);
       this.dialog.open(AddcarreraComponent, {
        width: '450px',
        data: { type: tipo, car: carrera }
      });
    }
  }
}
