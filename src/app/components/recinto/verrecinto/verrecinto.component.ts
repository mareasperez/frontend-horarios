import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecintoModel } from 'src/app/models/recinto.model';
import { RecintoService } from 'src/app/services/recinto.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AddrecintoComponent } from '../addrecinto/addrecinto.component';
import { Subscription, Observable } from 'rxjs';
import { FacultadModel } from 'src/app/models/facultad.model';
import { FacultadSerivice } from 'src/app/services/facultad.service';

@Component({
  selector: 'app-verrecinto',
  templateUrl: './verrecinto.component.html',
  styleUrls: ['./verrecinto.component.scss']
})
// tslint:disable: variable-name
// tslint:disable: no-shadowed-variable
export class VerrecintoComponent implements OnInit, OnDestroy {
  public recintos: RecintoModel[] = [];
  public facults: FacultadModel[] = [];
  public alerts = true;
  public subs: Subscription[] = [];
  private promesas: Promise<any>[] = [];
  public visible: boolean;
  sub: Subscription;
  refRecinto: Observable<any[]>;
  refFacultades: Observable<any[]>;
  displayedColumns: string[] = ['id', 'nombre', 'ubicacion', 'recinto_facultad', 'opciones'];
  socket: WebSocket;
  constructor(
    private RecintoService: RecintoService,
    private facultad$: FacultadSerivice,
    private dialog: MatDialog,
    private _snack: MatSnackBar
  ) {
    this.promesas.push(new Promise((resolve) => {
      const sub = this.RecintoService.getRecinto()
        .subscribe(
          res => this.recintos.push(res),
          error => this._snack.open(error, 'OK', { duration: 3000 }),
          () => resolve()
        );
    }));

    this.promesas.push(new Promise((resolve) => {
      const sub = this.facultad$.getFacultad()
        .subscribe(
          res => this.facults.push(res),
          error => this._snack.open(error, 'OK', { duration: 3000 }),
          () => resolve()
        );
      this.subs.push(sub);
    }));
    this.refRecinto = RecintoService.getList();
    this.refFacultades = facultad$.getList();

  }

  async ngOnInit() {
    Promise.all(this.promesas).then(res => {
      this.visible = true;
      this.RecintoService.successObten();
    });
    this.refRecinto.subscribe(data => {
      console.log(data);
      this.recintos = [];
      data.forEach(element => {
        this.recintos.push(element);
      });
    });
  }

  ngOnDestroy() {
    this.RecintoService.list = [];
    if (this.sub !== undefined) {
      this.sub.unsubscribe();
    }
  }

  openDialog(tipo, id?): void {
    if (tipo === 'c') {
      this.dialog.open(AddrecintoComponent, {
        width: '450px',
        data: { type: tipo }
      });
    } else {
      const recinto = this.recintos.find(d => d.recinto_id === id);
      this.dialog.open(AddrecintoComponent, {
        width: '450px',
        data: { type: tipo, rec: recinto }
      });
    }
  }
  deleteRecinto(id: string) {
    this.sub = this.RecintoService.deleteRecinto(id)
      .subscribe(
        res => { },
        error => this._snack.open(error.message, 'OK', { duration: 3000 }),
      );
  }
}
