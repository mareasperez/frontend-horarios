import { Component, OnInit, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { DepartamentoModel } from 'src/app/models/departamento.model';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { Observable, Subscription, from } from 'rxjs';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AdddepartamentoComponent } from 'src/app/components/departamento/adddepartamento/adddepartamento.component';
import { FacultadModel } from 'src/app/models/facultad.model';
import { FacultadSerivice } from 'src/app/services/facultad.service';

@Component({
  selector: 'app-verdepartamento',
  templateUrl: './verdepartamento.component.html',
  styleUrls: ['./verdepartamento.component.scss']
})

export class VerdepartamentoComponent implements OnInit, OnDestroy {
  public departamentos: DepartamentoModel[] = [];
  // public facultades: FacultadModel[] = [];
  public ref: Observable<any[]>;
  public refDepartamento: Observable<any[]>;
  // public resultado = new FacultadModel();
  public visible: boolean;
  sub: Subscription;
  constructor(
    // tslint:disable: variable-name
    private _departamento: DepartamentoService,
    private dialog: MatDialog,
    private _snack:MatSnackBar
  ) {
    this._departamento.getDepartamento()
    .subscribe(
      res => this.departamentos.push(res),
      error=>this._snack.open(error.message,"OK",{duration: 3000}),
      );
    this.refDepartamento = this._departamento.getList();
  }

  async ngOnInit() {
    await this.refDepartamento
    .subscribe(
      data => this.departamentos = data,
      error=>this._snack.open(error.message,"OK",{duration: 3000}),
    );
    await this.foo().then(
      () => {
        this.visible = true;
      });
  }

  ngOnDestroy() {
    this._departamento.list = [];
    if (this.sub !== undefined) {
      this.sub.unsubscribe();
    }
  }
  async foo() {
    console.log('loading');
    await this.sleep(1000);
    console.log('...');
    await this.sleep(1000);
    await this.sleep(2000);
    console.log('load complete');
  }

  sleep(ms = 0) {
    return new Promise(r => setTimeout(r, ms));
  }

  delDepartamento(id: any) {
    this.sub = this._departamento.deleteDepartamento(id)
    .subscribe(
      res=>{},
      error=>this._snack.open(error.message,"OK",{duration: 3000}),
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
