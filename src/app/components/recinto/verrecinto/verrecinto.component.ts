import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecintoModel } from 'src/app/models/recinto.model';
import { RecintoService } from 'src/app/services/recinto.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddrecintoComponent } from '../addrecinto/addrecinto.component';
import { Subscription, Observable } from 'rxjs';
import { FacultadModel } from 'src/app/models/facultad.model';
import { FacultadSerivice } from 'src/app/services/facultad.service';
import { TitleService } from 'src/app/services/title.service';
import { RedirIfFailPipe } from 'src/app/pipes/redir-if-fail.pipe';
import { Router } from '@angular/router';

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
  public isLoaded = false;
  sub: Subscription;
  refRecinto: Observable<any[]>;
  refFacultades: Observable<any[]>;
  displayedColumns: string[] = ['id', 'nombre', 'ubicacion', 'recinto_facultad', 'opciones'];
  socket: WebSocket;
  constructor(
    private RecintoService: RecintoService,
    private facultad$: FacultadSerivice,
    private dialog: MatDialog,
    private _snack: MatSnackBar,
    private _title: TitleService,
    private router: Router
  ) {
    this._title.setTitle('Recintos');
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
      if (new RedirIfFailPipe().transform('/facultad/list', this.facults, this.router)) {
        this.isLoaded = true;
        this.RecintoService.successObten();
        this.refRecinto.subscribe(data => {
          console.log(data);
          this.recintos = [];
          data.forEach(element => {
            this.recintos.push(element);
          });
        });
      }
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
