import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { ComponenteService } from 'src/app/services/componente.service';
import { Observable, Subscription } from 'rxjs';
import { ComponenteModel } from 'src/app/models/componente.model';
import { AreaModel } from 'src/app/models/area.model';
import { PlanEstudioModel } from 'src/app/models/planEstudio';
import { matErrorsMessage } from 'src/app/utils/errors';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AddComponenteComponent } from './add-componente/add-componente.component';
import { getItemLocalCache } from 'src/app/utils/utils';

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
  public pde = getItemLocalCache("pde");
  public ciclo = getItemLocalCache("ciclo");
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
        data: { type: tipo, areas:this.areas, pdes:this.pdes, pde: this.pde, ciclo: this.ciclo}
      });
    } else {
      const comp = this.componentes.find(d => d.componente_id === id);
      this.dialog.open(AddComponenteComponent, {
        width: '450px',
        data: { type: tipo, componente: comp, areas:this.areas, pdes:this.pdes }
      });
    }
  }


  addG(e,comp: string) {
    this.gpComp.emit(comp);
    this.changeColor(e);
  }

  changeColor(e){
    let item = document.getElementsByClassName('bg-color-yellow')[0];
    if(item){
      let elr = new ElementRef(item);
      elr.nativeElement.classList.remove('bg-color-yellow')
    }
    e.target.parentNode.classList.add('bg-color-yellow');

  }
}
