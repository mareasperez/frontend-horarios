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
  public componentes: ComponenteModel[] = [];
  public pdes: PlanEstudioModel[] = [];
  public areas: AreaModel[] = [];
  private subs: Subscription[] = [];
  public show: boolean;
  private promesas: Promise<any>[] = [];
  public dataSource = [];
  public pdeSelected = '0';
  displayedColumns: string[] = ['nombre', 'ciclo', 'area', 'thoras', 'phoras', 'creditos', 'opciones'];
  constructor(
    private _comp: ComponenteService,
    private _pde: PlanEstudioService,
    private _area: AreaService,
    private dialog: MatDialog,
    private _snack: MatSnackBar
  ) {
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

    this.promesas.push(p1, p2, p3);
    this.refPde = this._pde.getList();
    this.refComp = this._comp.getList();
    this.refArea = this._area.getList();
  }

  ngOnInit() {
    Promise.all(this.promesas).then(() => {
      this.show = true;
      this.subs.push(
        this.refComp.subscribe(data => {
          this.componentes = [];
          this.componentes = data;
          this.componentesByPde(this.pdeSelected);
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

  componentesByPde(id?: string) {
    if (id !== '0' && id !== undefined) {
      const compsByPde = this.componentes.filter(comp => comp.componente_pde === id);
      this.dataSource = compsByPde;
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
