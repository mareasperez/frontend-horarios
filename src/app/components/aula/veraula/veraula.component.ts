import { Component, OnInit, OnDestroy } from '@angular/core';
import { AulaModel } from 'src/app/models/aula.model';
import { AulaService } from 'src/app/services/aula.service';
import { Subscription, Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { RecintoService } from 'src/app/services/recinto.service';
import { RecintoModel } from 'src/app/models/recinto.model';
import { AddaulaComponent } from '../addaula/addaula.component';

@Component({
  selector: 'app-veraula',
  templateUrl: './veraula.component.html',
  styleUrls: ['./veraula.component.scss']
})
export class VeraulaComponent implements OnInit, OnDestroy {

  public aulas: AulaModel[] = [];
  recintos: RecintoModel[] = [];
  public activartabla = false;
  public selectedR;
  public dataSource;
  public refAula: Observable<any[]>;
  public alerts = true;
  sub: Subscription;
  displayedColumns: string[] = ['id', 'nombre', 'capacidad', 'tipo', 'opciones'];
  socket: WebSocket;
// tslint:disable-next-line: no-shadowed-variable
  constructor(private AulaService: AulaService,
              private _recinto: RecintoService,
              private dialog: MatDialog) {
    this.AulaService.getAula().subscribe(res => this.aulas.push(res));
    this.refAula = this.AulaService.getList();
    this._recinto.getRecinto().subscribe(res => this.recintos.push(res));
  }

  ngOnInit() {
    this.refAula.subscribe(data => {
      console.log(data);
      this.aulas = [];
      this.aulas = data;
    });
  }
  ngOnDestroy() {
    this.AulaService.list = [];
    if (this.sub !== undefined) {
      this.sub.unsubscribe();
    }
  }

  async getAulas(id: number) {
    console.log(id);
    this.aulas = [];
    this.aulas = await this.AulaService.list.filter(aula => aula.aula_recinto === id);
    this.dataSource = this.aulas;
    this.activartabla = true;
  }

  deleteAula(id: string) {
    this.sub = this.AulaService.deleteAula(id).subscribe();
  }

  openDialog(tipo, id?, aula?): void {
    if (tipo === 'c') {
      const dialogRef = this.dialog.open(AddaulaComponent, {
        width: '450px',
        data: {type: tipo, idr: id, aul: ''}
      });
    } else {
      const dialogRef = this.dialog.open(AddaulaComponent, {
        width: '450px',
        data: {type: tipo, idf: '', aul: aula}
      });
    }
  }
}
