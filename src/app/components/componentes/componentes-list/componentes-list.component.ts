import { Component, OnInit, OnDestroy } from '@angular/core';
import { ComponenteService } from 'src/app/services/componente.service';
import { Subscription, Observable } from 'rxjs';
import { ComponenteModel } from 'src/app/models/componente.model';
import { PlanEstudioModel } from 'src/app/models/planEstudio';
import { PlanEstudioService } from 'src/app/services/plan-estudio.service';
import { AddComponenteComponent } from '../add-componente/add-componente.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AreaService } from 'src/app/services/area.service';
import { AreaModel } from 'src/app/models/area.model';
import { getItemLocalCache } from 'src/app/utils/utils';
import { Title } from '@angular/platform-browser';
import { CarreraModel } from 'src/app/models/carrera.model';
import { CarreraService } from 'src/app/services/carrera.service';

@Component({
  selector: 'app-componentes-list',
  templateUrl: './componentes-list.component.html',
  styleUrls: ['./componentes-list.component.scss']
})
// tslint:disable: variable-name
export class ComponentesListComponent implements OnInit, OnDestroy {
  public refComp: Observable<any>;
  public refPde: Observable<PlanEstudioModel[]>;
  public refArea: Observable<AreaModel[]>;
  public refCarrera:Observable<CarreraModel[]>;
  public componentes: ComponenteModel[] = [];
  public pdes: PlanEstudioModel[] = [];
  public areas: AreaModel[] = [];
  private subs: Subscription[] = [];
  public isLoaded = false;
  private promesas: Promise<any>[] = [];
  public dataSource = [];
  public ciclos: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public cicloSelected: number = 1;
  public dataIsLoaded = false;
  public pdeFiltered: PlanEstudioModel[] = [];
  public carreraSelected: string;
  public carreras: CarreraModel[] = [];
  public pdeSelected: string;
  displayedColumns: string[] = ['nombre', 'ciclo', 'area', 'thoras', 'phoras', 'creditos', 'opciones'];
  constructor(
    private _title: Title,
    private _comp: ComponenteService,
    private _pde: PlanEstudioService,
    private _area: AreaService,
    private _carrera: CarreraService,
    private dialog: MatDialog,
    private _snack: MatSnackBar
  ) {
    this._title.setTitle('Componentes');
    const p1 = new Promise((resolve) => {
      const sub = this._pde.getPlanEstudio()
        .subscribe(
          res => this.pdes.push(res),
          error => this._snack.open(error.message, 'OK', { duration: 3000 }),
          () => resolve()
        );
      this.subs.push(sub);
    });
    const p2 = new Promise((resolve) => {
      const sub = this._comp.getComponentes()
        .subscribe(
          res => this.componentes.push(res),
          error => this._snack.open(error.message, 'OK', { duration: 3000 }),
          () => resolve()
        );
      this.subs.push(sub);
    });

    const p3 = new Promise((resolve) => {
      const sub = this._area.getAreas()
        .subscribe(
          res => this.areas.push(res),
          error => this._snack.open(error.message, 'OK', { duration: 3000 }),
          () => resolve()
        );
      this.subs.push(sub);
    });
    const p4 = new Promise((resolve) => {
      const sub = this._carrera.getCarrera()
      .subscribe(
        res => this.carreras.push(res),
        error => this._snack.open(error.message, 'OK', { duration: 3000 }),
        () => resolve()
      );
    this.subs.push(sub);
    });
    this.promesas.push(p1, p2, p3, p4);
    this.refPde = this._pde.getList();
    this.refComp = this._comp.getList();
    this.refArea = this._area.getList();
  }

  ngOnInit() {
    Promise.all(this.promesas).then(() => {
      this.carreraSelected = this.carreras[0].carrera_id;
      this.pdeByCarrera(this.carreraSelected);
      this.pdeSelected = this.pdeFiltered[0].pde_id;
      this.componentesByPde(this.cicloSelected);
      this.isLoaded = true;
      this._comp.successObten();
      this.subs.push(
        this.refComp.subscribe(data => {
          this.componentes = [];
          this.componentes = data;
        }),
        this.refPde.subscribe(data => this.pdes = data),
        this.refArea.subscribe(data => this.areas = data)
      );
    });
  }

  ngOnDestroy() {
    this._comp.list = [];
    this._area.list = [];
    this._pde.list = [];
    this.subs.forEach(sub => sub.unsubscribe());
  }

  pdeByCarrera(id?: string) {
    if (id !== null && id !== undefined) {
      const pdebyCar = this.pdes.filter(comp => comp.pde_carrera === id);
      this.pdeFiltered = pdebyCar;
      this.pdeSelected = this.pdeFiltered[0].pde_id;
    }
  }

  llamarACiclo(){
    this.cicloSelected = this.ciclos[0];
  }

  componentesByPde(id?: number) {
    if (id !== null && id !== undefined) {
      this.dataIsLoaded = false;
      const compsByPde = this.componentes.filter(comp => comp.componente_pde === this.pdeSelected);
      const compsByCiclo = compsByPde.filter( comp => comp.componente_ciclo === id);
      this.dataSource = compsByCiclo;
      this.dataIsLoaded = true;
    }

  }
  delComponente(e) {
    this.subs.push(this._comp.deleteComponente(e).subscribe());
  }

  openDialog(tipo: string, id?: any): void {
    if (tipo === 'c') {
      const dialogRef = this.dialog.open(AddComponenteComponent, {
        width: '450px',
        data: { type: tipo, pde: this.pdeSelected, areas: this.areas, pdes: this.pdes }
      });
    } else {
      const comp = this.componentes.find(d => d.componente_id === id);
      this.dialog.open(AddComponenteComponent, {
        width: '450px',
        data: { type: tipo, pde: this.pdeSelected, componente: comp, areas: this.areas, pdes: this.pdes }
      });
    }
  }
}
