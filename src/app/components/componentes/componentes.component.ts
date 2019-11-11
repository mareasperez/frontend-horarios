import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ComponenteService } from 'src/app/services/componente.service';
import { Observable, Subscription } from 'rxjs';
import { ComponenteModel } from 'src/app/models/componente.model';
import { AreaModel } from 'src/app/models/area.model';
import { PlanEstudioModel } from 'src/app/models/planEstudio';
import { matErrorsMessage } from 'src/app/utils/errors';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AddComponenteComponent } from './add-componente/add-componente.component';

@Component({
  selector: 'app-componentes',
  templateUrl: './componentes.component.html',
  styleUrls: ['./componentes.component.scss']
})
export class ComponentesComponent implements OnInit, OnDestroy {
  // tslint:disable: variable-name
  public ref: Observable<any[]>;
  public refArea: Observable<any[]>;
  public refPde: Observable<any[]>;
  @Output() public gpComp = new EventEmitter<string>();
  @Input() public componentes: ComponenteModel[] = [];
  @Input() public areas: AreaModel[] = [];
  @Input() public pdes: PlanEstudioModel[] = [];
  public componente: ComponenteModel = null;
  public selected = '0';
  public selected2 = '0';
  public add = false;
  public editing = false;
  subs: Subscription[] = [];
  public Errors: matErrorsMessage = new matErrorsMessage();
  public gpadd = true;

  constructor(
    private comService: ComponenteService,
    private _snack: MatSnackBar,
    private dialog: MatDialog,
    ) {  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.comService.list = [];
    this.subs.map(sub => sub.unsubscribe());

  }

  editHoras(id, ht, hp) {
    let comp = new ComponenteModel();
    comp.componente_cht = ht;
    comp.componente_chp = hp;
    this.comService.updateComponente(comp, id).subscribe();
  }

  delComponente(e) {
    this.subs.push(this.comService.deleteComponente(e).subscribe(
      res => {},
      error => this._snack.open(error.message, 'OK', {duration: 3000})
    ));
  }



  openDialog(tipo: string, id?: any): void {
    if (tipo === 'c') {
       this.dialog.open(AddComponenteComponent, {
        width: '450px',
        data: { type: tipo }
      });
    } else {
      const comp = this.componentes.find(d => d.componente_id === id);
      this.dialog.open(AddComponenteComponent, {
        width: '450px',
        data: { type: tipo, componente: comp }
      });
    }
  }


  addG(comp: string) {
    this.gpComp.emit(comp);
  }
}
