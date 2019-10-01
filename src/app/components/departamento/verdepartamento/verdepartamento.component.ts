import { Component, OnInit, OnDestroy, Pipe, PipeTransform } from '@angular/core';
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

export class VerdepartamentoComponent implements OnInit, OnDestroy {
  public departamentos: DepartamentoModel[] = [];
  public facultades: FacultadModel [] = [];
  public ref: Observable<any[]>;
  public refDepartamento: Observable<any[]>;
  public resultado = new FacultadModel();
  sub: Subscription;
  constructor(
    private _departamento: DepartamentoService,
    private facultad$: FacultadSerivice,
    private dialog: MatDialog
    ) {
    this._departamento.getDepartamento().subscribe(res => this.departamentos.push(res));
    this.facultad$.getFacultad().subscribe(res2 => this.facultades.push(res2));
    this.refDepartamento = this._departamento.getList();
  }

  ngOnInit() {
    this.refDepartamento.subscribe(data => {
      this.departamentos = data;
    });
  }

  ngOnDestroy() {
    this._departamento.list = [];
    if (this.sub !== undefined) {
      this.sub.unsubscribe();
    }
  }

  delDepartamento(id: any) {
    this.sub = this._departamento.deleteDepartamento(id).subscribe();
  }

  getNombreFacultad(point: string): string {
    this.resultado = this.facultad$.list.find(facultad => facultad.facultad_id === point);
    return this.resultado.facultad_nombre;
}

  openDialog(tipo, id?): void {
    if (tipo === 'c') {
      const dialogRef = this.dialog.open(AdddepartamentoComponent, {
        width: '450px',
        data: {type: tipo}
      });
    } else {
      console.log('el tipo es', tipo);
      const departamento = this.departamentos.find(d => d.departamento_id === id);
      const dialogRef = this.dialog.open(AdddepartamentoComponent, {
        width: '450px',
        data: {type: tipo, dep: departamento}
      });
    }
  }
}
