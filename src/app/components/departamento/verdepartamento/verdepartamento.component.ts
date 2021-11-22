import { Component, OnInit, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { DepartamentoModel } from 'src/app/models/departamento.model';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { Observable, Subscription, from } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdddepartamentoComponent } from 'src/app/components/departamento/adddepartamento/adddepartamento.component';
import { FacultadModel } from 'src/app/models/facultad.model';
import { FacultadSerivice } from 'src/app/services/facultad.service';
import { TitleService } from 'src/app/services/title.service';
import { Router } from '@angular/router';
import { RedirIfFailPipe } from 'src/app/pipes/redir-if-fail.pipe';

@Component({
  selector: 'app-verdepartamento',
  templateUrl: './verdepartamento.component.html',
  styleUrls: ['./verdepartamento.component.scss']
})
// tslint:disable: no-shadowed-variable>
// tslint:disable: variable-name
export class VerdepartamentoComponent implements OnInit, OnDestroy {
  public departamentos: DepartamentoModel[] = [];
  public facults: FacultadModel[] = [];
  public ref: Observable<any[]>;
  public refDepartamento: Observable<any[]>;
  public isLoaded = false;
  private subs: Subscription[] = [];
  private promesas: Promise<any>[] = [];
  public dataSource = [];
  sub: Subscription;
  displayedColumns: string[] = ['id', 'nombre', 'facultad', 'opciones'];
  constructor(
    private _title: TitleService,
    private _departamento: DepartamentoService,
    private dialog: MatDialog,
    private facultad$: FacultadSerivice,
    private _snack: MatSnackBar,
    private router: Router
  ) {
    this._title.setTitle('Departamento');
    this.promesas.push(new Promise((resolve) => {
      const sub = this._departamento.getDepartamento()
        .subscribe(
          res => this.departamentos.push(res),
          error => this._snack.open(error, 'OK', { duration: 3000 }),
          () => resolve()
        );
      this.subs.push(sub);
      this.dataSource = this.departamentos;
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
    this.refDepartamento = this._departamento.getList();
    this.ref = this.facultad$.getList();
  }

  ngOnInit() {
    Promise.all(this.promesas).then(res => {
      if (new RedirIfFailPipe().transform('/facultad/list', this.facults, this.router)) {
        this.isLoaded = true;
        this._departamento.successObten();
        this.refDepartamento.subscribe(data => {
          console.log(data);
          this.departamentos = data;
          this.dataSource = [];
          this.departamentos.forEach(dep => {
            this.dataSource.push(dep);
          });
        });
      }
    });
  }

  ngOnDestroy() {
    this._departamento.list = [];
    if (this.sub !== undefined) {
      this.sub.unsubscribe();
    }
  }

  delDepartamento(id: any) {
    this.sub = this._departamento.deleteDepartamento(id)
      .subscribe(
        res => { },
        error => this._snack.open(error.error.detail, 'OK', { duration: 3000 }),
      );
  }

  openDialog(tipo, id?): void {
    if (tipo === 'c') {
      this.dialog.open(AdddepartamentoComponent, {
        width: '450px',
        data: { type: tipo }
      });
    } else {
      console.log('el tipo es', tipo);
      const departamento = this.departamentos.find(d => d.departamento_id === id);
      this.dialog.open(AdddepartamentoComponent, {
        width: '450px',
        data: { type: tipo, dep: departamento }
      });
    }
  }
}
