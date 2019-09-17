import { Component, OnInit } from '@angular/core';
import { DepartamentoModel } from 'src/app/models/departamento.model';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { Observable, Subscription, from } from 'rxjs';
import { MatDialog } from '@angular/material';
import { AdddepartamentoComponent } from 'src/app/components/departamento/adddepartamento/adddepartamento.component';
import { FacultadModel } from 'src/app/models/facultad.model';
import { FacultadSerivice } from 'src/app/services/facultad.service';
@Component({
  selector: 'app-verdepartamento',
  templateUrl: './verdepartamento.component.html',
  styleUrls: ['./verdepartamento.component.scss']
})
export class VerdepartamentoComponent implements OnInit {

  public departamentos: DepartamentoModel[] = [];
  public facultades: FacultadModel [] = [];
  // tslint:disable-next-line: no-shadowed-variable
  public ref: Observable<any[]>;
  public refDepartamento: Observable<any[]>;
  sub: Subscription;
  constructor(
    private _departamento: DepartamentoService,
    private _facultad: FacultadSerivice,
    private dialog: MatDialog
    ) {
    this._departamento.getDepartamento().subscribe(res => this.departamentos.push(res));
    this._facultad.getFacultad().subscribe(res2 => this.facultades.push(res2));
    this.refDepartamento = this._departamento.getList();
  }

  ngOnInit() {
    this.refDepartamento.subscribe(data => {
      this.departamentos = data;
    });
  }

  ngOnDestroy() {
    if (this.sub !== undefined) {
      this.sub.unsubscribe();
    }
  }

  delDepartamento(id: any) {
    this.sub = this._departamento.deleteDepartamento(id).subscribe()
  }

  openDialog(tipo, nombre?, idd?, facultadd?): void {
    if (tipo === 'c') {
      const dialogRef = this.dialog.open(AdddepartamentoComponent, {
        width: '450px',
        data: {type: tipo}
      });
    } else {
      console.log('se llamo al upd con los valores:', tipo, nombre, idd, facultadd);

      const dialogRef = this.dialog.open(AdddepartamentoComponent, {
        width: '450px',
        data: {type: tipo, name: nombre, id: idd, facultad: facultadd}
      });
    }
  }
  // nFacultad(id: any) {
  //   const result = this.facultades;
  // }
}
