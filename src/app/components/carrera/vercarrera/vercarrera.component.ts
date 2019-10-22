import { Component, OnInit, OnDestroy } from '@angular/core';
import { CarreraModel } from 'src/app/models/carrera.model';
import { Observable, Subscription } from 'rxjs';
import { CarreraService } from 'src/app/services/carrera.service';
import { MatDialog } from '@angular/material';
import { AddcarreraComponent } from '../addcarrera/addcarrera.component';
import { DepartamentoModel } from 'src/app/models/departamento.model';
import { DepartamentoService } from 'src/app/services/departamento.service';

@Component({
  selector: 'app-vercarrera',
  templateUrl: './vercarrera.component.html',
  styleUrls: ['./vercarrera.component.scss']
})
export class VercarreraComponent implements OnInit, OnDestroy {
  public carreras: CarreraModel[] = [];
  public departamentos: DepartamentoModel[] = [];
  public ref: Observable<any[]>;
  public refCarrera: Observable<any[]>;
  public visible: boolean;
  sub: Subscription;
  constructor(
    private carrera$: CarreraService,
    private departamento$: DepartamentoService,
    private dialog: MatDialog
  ) {
    this.carrera$.getCarrera().subscribe(res => this.carreras.push(res));
    this.departamento$.getDepartamento().subscribe(res2 => this.departamentos.push(res2));
    this.refCarrera = this.carrera$.getList();
  }

  async ngOnInit() {
    this.refCarrera.subscribe(data => this.carreras = data);
    await this.foo().then(
      () => {
        this.visible = true;
      });
  }
  ngOnDestroy() {
    this.carrera$.list = [];
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
  delCarrera(id: any) {
    this.sub = this.carrera$.deleteCarrera(id).subscribe();
  }

  openDialog(tipo: string, id?: any): void {
    if (tipo === 'c') {
      const dialogRef = this.dialog.open(AddcarreraComponent, {
        width: '450px',
        data: { type: tipo }
      });
    } else {
      const carrera = this.carreras.find(d => d.carrera_id === id);
      const dialogRef = this.dialog.open(AddcarreraComponent, {
        width: '450px',
        data: { type: tipo, car: carrera }
      });
    }
  }
}
