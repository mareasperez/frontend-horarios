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
import { TitleService } from 'src/app/services/title.service';
import { CarreraModel } from 'src/app/models/carrera.model';
import { CarreraService } from 'src/app/services/carrera.service';
import { getItemLocalCache } from 'src/app/utils/utils';

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
  public refCarrera: Observable<CarreraModel[]>;
  public componentes: ComponenteModel[] = [];
  public pdes: PlanEstudioModel[] = [];
  public areas: AreaModel[] = [];
  private subs: Subscription[] = [];
  public isLoaded = false;
  private promesas: Promise<any>[] = [];
  public dataSource = [];
  public ciclos: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public cicloSelected = getItemLocalCache('ciclo') ? getItemLocalCache('ciclo') : 1;
  public dataIsLoaded = false;
  public pdeFiltered: PlanEstudioModel[] = [];
  public carreraSelected: CarreraModel;
  public carreras: CarreraModel[] = [];
  public pdeSelected: PlanEstudioModel;
  displayedColumns: string[] = ['nombre', 'ciclo', 'area', 'thoras', 'phoras', 'creditos', 'opciones'];
  constructor(
    private _title: TitleService,
    private _comp: ComponenteService,
    private _pde: PlanEstudioService,
    private _area: AreaService,
    private _carrera: CarreraService,
    private dialog: MatDialog,
    private _snack: MatSnackBar
  ) {
    this._title.setTitle('Componentes');
    this.promesas.push(new Promise((resolve) => {
      const sub = this._pde.getPlanEstudio()
        .subscribe(
          res => this.pdes.push(res),
          error => this._snack.open(error.message, 'OK', { duration: 3000 }),
          () => resolve()
        );
      this.subs.push(sub);
    }));
    this.promesas.push(new Promise((resolve) => {
      const sub = this._comp.getComponentes()
        .subscribe(
          res => this.componentes.push(res),
          error => this._snack.open(error.message, 'OK', { duration: 3000 }),
          () => resolve()
        );
      this.subs.push(sub);
    }));

    this.promesas.push(new Promise((resolve) => {
      const sub = this._area.getAreas()
        .subscribe(
          res => this.areas.push(res),
          error => this._snack.open(error.message, 'OK', { duration: 3000 }),
          () => resolve()
        );
      this.subs.push(sub);
    }));
    this.promesas.push(new Promise((resolve) => {
      const sub = this._carrera.getCarrera()
        .subscribe(
          res => this.carreras.push(res),
          error => this._snack.open(error.message, 'OK', { duration: 3000 }),
          () => resolve()
        );
      this.subs.push(sub);
    }));
    this.refPde = this._pde.getList();
    this.refComp = this._comp.getList();
    this.refArea = this._area.getList();
  }

  ngOnInit() {
    Promise.all(this.promesas).then(() => {
      this.carreraSelected = this.carreras.find(carrera => carrera.carrera_id === getItemLocalCache('carrera'));
      if (!this.carreraSelected) {
        this.carreraSelected = this.carreras[0];
      }
      this.pdeByCarrera(this.carreraSelected.carrera_id);
      this.pdeSelected = this.pdeFiltered.find(pde => pde.pde_id === getItemLocalCache('pde'));
      if (!this.pdeSelected) {
        this.pdeSelected = this.pdeFiltered[0];
      }
      this.componentesByPde(this.cicloSelected);
      this.isLoaded = true;
      this._comp.successObten();
      this.subs.push(
        this.refComp.subscribe(data => {
          this.componentes = [];
          this.componentes = data;
          if (this.pdeSelected && this.cicloSelected) {
            this.componentesByPde(Number(this.cicloSelected));
          }
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
      this.pdeSelected = this.pdeFiltered[0];
    }
  }

  llamarACiclo() {
    this.cicloSelected = this.ciclos[0];
  }

  componentesByPde(id: number) {
    if (id !== null && id !== undefined) {
      this.dataIsLoaded = false;
      const compsByPde = this.componentes.filter(comp => comp.componente_pde === this.pdeSelected.pde_id);
      const compsByCiclo = compsByPde.filter(comp => comp.componente_ciclo === id);
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
        data: { type: tipo, pde: this.pdeSelected, areas: this.areas, pdes: this.pdes, ciclo: this.cicloSelected }
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
