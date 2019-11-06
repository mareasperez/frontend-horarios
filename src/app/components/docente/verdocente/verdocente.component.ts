import { Component, OnInit } from '@angular/core';
import { DocenteModel } from 'src/app/models/docente.model';
import { DocenteService } from 'src/app/services/docente.service';
import { AdddocenteComponent } from '../adddocente/adddocente.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { DepartamentoModel } from 'src/app/models/departamento.model';
import { DepartamentoService } from 'src/app/services/departamento.service';
@Component({
  selector: 'app-verdocente',
  templateUrl: './verdocente.component.html',
  styleUrls: ['./verdocente.component.scss']
})
export class VerdocenteComponent implements OnInit {

  public docentes: DocenteModel[] = [];
  public refDocentes: Observable<any[]>;
  public alerts = true;
  public dataSource;
  public departamentos: DepartamentoModel[] = [];
  subs: Subscription[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'contrato', 'inss', 'departamento', 'opciones'];
  constructor(
    // tslint:disable: no-shadowed-variable
    // tslint:disable variable-name
    private DocenteService: DocenteService,
    private _Departamento: DepartamentoService,
    private dialog: MatDialog,
    private _snack:MatSnackBar
  ) {
    let p = new Promise<void>(() => {
      this._Departamento.getDepartamento()
      .subscribe(
        res => this.departamentos.push(res),
        error=>this._snack.open(error.message,"OK",{duration: 3000}),
      );
    });
    this.DocenteService.getDocente()
    .subscribe(
      res => {
      this.docentes.push(res);
      this.dataSource = this.docentes;
      },
      error=>this._snack.open(error.message,"OK",{duration: 3000}),
    );
    this.refDocentes = this.DocenteService.getList();
  }

  ngOnInit() {
    this.docentes.forEach(res => console.log(res));
    this.subs.push(
      this.refDocentes.subscribe(data => {
        this.dataSource = [];
        this.docentes = data;
        data.map(doc => {
          this.dataSource.push(doc);
        });
      })
    );
  }


  deleteDocente(id: string) {
    this.DocenteService.deleteDocente(id)
    .subscribe(
      res => {},
      error=>this._snack.open(error.message,"OK",{duration: 3000}),
    );
  }

  openDialog(tipo, id?: string): void {
    if (tipo === 'c') {
     this.dialog.open(AdddocenteComponent, {
        width: '450px',
        data: { type: tipo, doc: null }
      });
    } else {
      let docente = this.docentes.find(d => d.docente_id === id);
      this.dialog.open(AdddocenteComponent, {
        width: '450px',
        data: { type: tipo, doc: docente }
      });
    }
  }

}
