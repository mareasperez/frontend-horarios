import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { ComponenteService } from 'src/app/services/componente.service';
import { Observable, Subscription } from 'rxjs';
import { ComponenteModel } from 'src/app/models/componente.model';
import { AreaModel } from 'src/app/models/area.model';
import { PlanEstudioModel } from 'src/app/models/planEstudio';
import { matErrorsMessage } from 'src/app/utils/errors';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AddComponenteComponent } from '../../componentes/add-componente/add-componente.component';
import { getItemLocalCache } from 'src/app/utils/utils';

@Component({
  selector: 'app-componentes',
  templateUrl: './componentes.component.html',
  styleUrls: ['./componentes.component.scss'],
})
export class ComponentesComponent implements OnInit, OnDestroy {
  // tslint:disable: variable-name
  @Output() public gpComp = new EventEmitter<string>();
  @Input() public componentes: ComponenteModel[] = [];
  @Input() public areas: AreaModel[] = [];
  @Input() public pdes: PlanEstudioModel[] = [];
  public pde = getItemLocalCache('pde');
  public ciclo = getItemLocalCache('ciclo');
  public componente: ComponenteModel = null;
  subs: Subscription[] = [];
  public Errors: matErrorsMessage = new matErrorsMessage();
  constructor(private comService: ComponenteService, private _snack: MatSnackBar, private dialog: MatDialog) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.comService.list = [];
    this.subs.map((sub) => sub.unsubscribe());
  }

  editHoras(id, ht, hp) {
    const comp = new ComponenteModel();
    comp.componente_cht = ht;
    comp.componente_chp = hp;
    this.comService.updateComponente(comp, id).subscribe();
  }

  delComponente(e) {
    this.subs.push(
      this.comService.deleteComponente(e).subscribe(
        (res) => {},
        (error) => this._snack.open(error.message, 'OK', { duration: 3000 })
      )
    );
  }

  openDialog(tipo: string, id?: any): void {
    if (!this.pdes.length) {
      return;
    } else if (!id) {
      this.pde = this.pdes[this.pdes.length - 1];
    }
    if (tipo === 'c') {
      this.dialog.open(AddComponenteComponent, {
        width: '450px',
        data: { type: tipo, areas: this.areas, pdes: this.pdes, pde: this.pde, ciclo: this.ciclo },
      });
    } else {
      const comp = this.componentes.find((d) => d.componente_id === id);
      this.dialog.open(AddComponenteComponent, {
        width: '450px',
        data: { type: tipo, componente: comp, areas: this.areas, pdes: this.pdes },
      });
    }
  }

  addG(comp: ComponenteModel) {
    this.gpComp.emit(comp.componente_id);
    this.componente = comp;
  }
}
