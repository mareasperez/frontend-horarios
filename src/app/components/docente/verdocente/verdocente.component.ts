import { Component, OnInit } from '@angular/core';
import { DocenteModel } from 'src/app/models/docente.model';
import { DocenteService } from 'src/app/services/docente.service';
import { AdddocenteComponent } from '../adddocente/adddocente.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { DepartamentoModel } from 'src/app/models/departamento.model';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { TitleService } from 'src/app/services/title.service';
@Component({
  selector: 'app-verdocente',
  templateUrl: './verdocente.component.html',
  styleUrls: ['./verdocente.component.scss']
})
// tslint:disable: no-shadowed-variable
// tslint:disable variable-name
export class VerdocenteComponent implements OnInit {
  public docentes: DocenteModel[] = [];
  public refDocentes: Observable<any[]>;
  public refDepartamento: Observable<any>;
  public alerts = true;
  public dataSource;
  public isLoaded = false;
  public departamentos: DepartamentoModel[] = [];
  subs: Subscription[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'contrato', 'inss', 'departamento', 'opciones'];
  public promesas: Promise<any>[] = [];
  constructor(
    private _title: TitleService,
    private DocenteService: DocenteService,
    private _Departamento: DepartamentoService,
    private dialog: MatDialog,
    private _snack: MatSnackBar
  ) {
    this._title.setTitle('Docente');
    this.promesas.push(new Promise<void>((resolve) => {
      this._Departamento.getDepartamento()
        .subscribe(
          res => this.departamentos.push(res),
          error => this._snack.open(error.message, 'OK', { duration: 3000 }),
          () => resolve()
        );
    }));
    this.promesas.push(new Promise<void>((resolve) => {
      this.DocenteService.getDocente()
        .subscribe(
          res => {
            this.docentes.push(res);
            this.dataSource = this.docentes;
          },
          error => this._snack.open(error.message, 'OK', { duration: 3000 }),
          () => resolve()
        );
    }));
    this.refDepartamento = this._Departamento.getList();
    this.refDocentes = this.DocenteService.getList();
  }

  ngOnInit() {
    Promise.all(this.promesas).then(() => {
      //  this.docentes.forEach(res => console.log(res));
      this.DocenteService.successObten();
      this.isLoaded = true;
      this.subs.push(
        this.refDocentes.subscribe(data => {
          this.dataSource = [];
          this.docentes = data;
          data.map(doc => {
            this.dataSource.push(doc);
          });
        })
      );
    });
  }


  deleteDocente(id: string) {
    this.DocenteService.deleteDocente(id)
      .subscribe(
        res => { },
        error => this._snack.open(error.message, 'OK', { duration: 3000 }),
      );
  }

  openDialog(tipo, id?: string): void {
    if (tipo === 'c') {
      this.dialog.open(AdddocenteComponent, {
        width: '450px',
        data: { type: tipo, doc: null }
      });
    } else {
      const docente = this.docentes.find(d => d.docente_id === id);
      this.dialog.open(AdddocenteComponent, {
        width: '450px',
        data: { type: tipo, doc: docente }
      });
    }
  }

}
