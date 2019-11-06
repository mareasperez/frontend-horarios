import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecintoModel } from 'src/app/models/recinto.model';
import { RecintoService } from 'src/app/services/recinto.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AddrecintoComponent } from '../addrecinto/addrecinto.component';
import { Subscription, Observable } from 'rxjs';
import { FacultadModel } from 'src/app/models/facultad.model';
import { FacultadSerivice } from 'src/app/services/facultad.service';
import { resolve } from 'url';
import { promise } from 'protractor';

@Component({
  selector: 'app-verrecinto',
  templateUrl: './verrecinto.component.html',
  styleUrls: ['./verrecinto.component.scss']
})
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
  // tslint:disable-next-line: no-shadowed-variable
  constructor(
    private RecintoService: RecintoService,
    private facultad$: FacultadSerivice,
    private dialog: MatDialog,
    private _snack: MatSnackBar
  ) {
    const p1 = new Promise((resolve) => {
      const sub = this.RecintoService.getRecinto()
        .subscribe(
          res => this.recintos.push(res),
          error => this._snack.open(error, 'OK', {duration: 3000}),
          () => resolve()
        );
    });

    let p2 = new Promise((resolve) => {
      let sub = this.facultad$.getFacultad()
        .subscribe(
          res => this.facults.push(res),
          error => this._snack.open(error, 'OK', {duration: 3000}),
          () => resolve()
        );
      this.subs.push(sub);
    });
    this.promesas.push(p1, p2);
    this.refRecinto = RecintoService.getList();
    this.refFacultades = facultad$.getList();

  }

  async ngOnInit() {
    Promise.all(this.promesas).then(res => {
      this.visible = true;
    });
    this.refRecinto.subscribe( data => {
      console.log(data);
      this.recintos = data;
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
      res => {},
      error => this._snack.open(error.message,'OK', {duration: 3000}),
    );
  }
}
