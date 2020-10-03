import { Component, OnInit, OnDestroy } from '@angular/core';
import { CarreraModel } from 'src/app/models/carrera.model';
import { Observable, Subscription } from 'rxjs';
import { CarreraService } from 'src/app/services/carrera.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AddcarreraComponent } from '../addcarrera/addcarrera.component';
import { DepartamentoModel } from 'src/app/models/departamento.model';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-vercarrera',
  templateUrl: './vercarrera.component.html',
  styleUrls: ['./vercarrera.component.scss']
})
// tslint:disable: variable-name
export class VercarreraComponent implements OnInit, OnDestroy {
  public carreras: CarreraModel[] = [];
  public departamentos: DepartamentoModel[] = [];
  public refDep: Observable<any[]>;
  public refCarrera: Observable<any>;
  public visible: boolean;
  public isLoaded = false;
  private subs: Subscription[] = [];
  private promesas: Promise<any>[] = [];
  public dataSource = [];
  sub: Subscription;
  displayedColumns: string[] = ['id', 'nombre', 'departamento', 'opciones'];
  constructor(
    private _title: TitleService,
    private carrera$: CarreraService,
    private departamento$: DepartamentoService,
    private dialog: MatDialog,
    private _snack: MatSnackBar
  ) {
    this._title.setTitle('Carreras');
    this.promesas.push(new Promise((resolve) => {
      const sub = this.carrera$.getCarrera()
        .subscribe(
          res => this.carreras.push(res),
          error => this._snack.open(error, 'OK', { duration: 3000 }),
          () => resolve()
        );
      this.subs.push(sub);
      this.dataSource = this.carreras;
    }));
    this.promesas.push(new Promise((resolve) => {
      const sub = this.departamento$.getDepartamento()
        .subscribe(
          res => this.departamentos.push(res),
          error => this._snack.open(error, 'OK', { duration: 3000 }),
          () => resolve()
        );
      this.subs.push(sub);

    }));
    this.refCarrera = this.carrera$.getList();
    this.refDep = this.departamento$.getList();
  }

  ngOnInit() {
    Promise.all(this.promesas).then(res => {
      this.isLoaded = true;
      this.carrera$.successObten();
      this.refCarrera.subscribe(data => {
        console.log(data);
        this.carreras = data;
        this.dataSource = [];
        this.carreras.forEach(car => this.dataSource.push(car));
      });
      this.refDep.subscribe(data => {
        this.departamentos = data;
      });
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
        res => { },
        error => this._snack.open(error.message, 'OK', { duration: 5000 }),
      );
  }

  openDialog(tipo: string, id?: any): void {
    if (tipo === 'c') {
      this.dialog.open(AddcarreraComponent, {
        width: '450px',
        data: { type: tipo, departamentos: this.departamentos }
      });
    } else {
      const carrera = this.carreras.find(d => d.carrera_id === id);
      this.dialog.open(AddcarreraComponent, {
        width: '450px',
        data: { type: tipo, car: carrera, departamentos: this.departamentos }
      });
    }
  }
}
