import { Component, OnInit, OnDestroy } from '@angular/core';
import { AulaModel } from 'src/app/models/aula.model';
import { AulaService } from 'src/app/services/aula.service';
import { Subscription, Observable } from 'rxjs';
import { MatDialog, MatSnackBar } from '@angular/material';
import { RecintoService } from 'src/app/services/recinto.service';
import { RecintoModel } from 'src/app/models/recinto.model';
import { AddaulaComponent } from '../addaula/addaula.component';
import { getItemLocalCache } from 'src/app/utils/utils';

@Component({
  selector: 'app-veraula',
  templateUrl: './veraula.component.html',
  styleUrls: ['./veraula.component.scss']
})
// tslint:disable: no-shadowed-variable
// tslint:disable: variable-name
export class VeraulaComponent implements OnInit, OnDestroy {
  public aulas: AulaModel[] = [];
  public recintos: RecintoModel[] = [];
  private promesas: Promise<any>[] = [];
  public activartabla = false;
  public selectedR = getItemLocalCache("recinto") ;
  public dataSource ;
  public refAula: Observable<any[]>;
  public refRecintos: Observable<any[]>;
  public alerts = true;
  sub: Subscription;
  displayedColumns: string[] = ['id', 'nombre', 'capacidad', 'tipo', 'opciones'];
  socket: WebSocket;
  constructor(
    private AulaService: AulaService,
    private _recinto: RecintoService,
    private dialog: MatDialog,
    private _snack: MatSnackBar
  ) {
    const p = new Promise<void>((resolve) => {
      this.AulaService.getAula()
        .subscribe(
          res => { this.aulas.push(res); },
          error => this._snack.open(error.message, 'OK', { duration: 3000 }),
          () => resolve()

        );
    });
    const p1 = new Promise<void>((resolve) => {
      this._recinto.getRecinto()
        .subscribe(
          res => this.recintos.push(res),
          error => this._snack.open(error.message, 'OK', { duration: 3000 }),
          () => resolve()
        );
    });
    this.refRecintos = this._recinto.getList();
    this.refAula = this.AulaService.getList();
    this.promesas.push(p, p1);
  }

  ngOnInit() {
    Promise.all(this.promesas).then(() => {
      this.refAula.subscribe((data: AulaModel[]) => {
        console.log('se ejecuto el subs de aula');
        this.aulas = data;
        this.getAulas(this.selectedR);

      });
      this.refRecintos.subscribe((data: RecintoModel[]) => {
        this.recintos = data;
      });
      this.getAulas(this.selectedR);
    });
  }
  ngOnDestroy() {
    this.AulaService.list = [];
    this._recinto.list = [];
    if (this.sub !== undefined) {
      this.sub.unsubscribe();
    }
  }

  getAulas(id: string) {
    this.dataSource = this.aulas.filter(aula => aula.aula_recinto === id);
    console.log(this.dataSource)
    this.alerts = false;
    this.activartabla = true;
  }

  deleteAula(id: string) {
    this.sub = this.AulaService.deleteAula(id)
      .subscribe(
        res => { },
        error => this._snack.open(error.message, 'OK', { duration: 3000 }),
      );
  }

  openDialog(tipo, id?, aula?): void {
    if (tipo === 'c') {
      this.dialog.open(AddaulaComponent, {
        width: '450px',
        data: { type: tipo, idr: id, aul: '', recintos: this.recintos }
      });
    } else {
      this.dialog.open(AddaulaComponent, {
        width: '450px',
        data: { type: tipo, idf: '', aul: aula, recintos: this.recintos }
      });
    }
  }
}
