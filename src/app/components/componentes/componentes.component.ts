import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ComponenteService } from 'src/app/services/componente.service';
import { Observable, Subscription } from 'rxjs';
import { ComponenteModel } from 'src/app/models/componente.model';
import { AreaModel } from 'src/app/models/area.model';
import { PlanEstudioModel } from 'src/app/models/planEstudio';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { matErrorsMessage } from 'src/app/utils/errors';

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
  @Output() public gpAdd = new EventEmitter<{}>()
  @Input() public componentes: ComponenteModel[] = [];
  @Input() public areas: AreaModel[] = [];
  @Input() public pdes: PlanEstudioModel[] = [];
  public componente:ComponenteModel = null;
  public form: FormGroup;
  public selected = '0';
  public selected2 = '0';
  public add = false;
  public editing = false;
  subs: Subscription[] = [];
  public Errors: matErrorsMessage = new matErrorsMessage();
  public gpadd = true;

  constructor(
    private comService: ComponenteService,
    private fb: FormBuilder) {  }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    this.comService.list = [];
    this.subs.map(sub => sub.unsubscribe());

  }

  createForm(flag: number, id?: string) {
    if (flag === 0) {
      this.form = this.fb.group({
        componente_id: null,
        componente_nombre: new FormControl('', [Validators.required, Validators.minLength(5)]),
        componente_chp: new FormControl('', [Validators.required, Validators.min(1)]),
        componente_cht: new FormControl('', [Validators.required, Validators.min(1)]),
        componente_ciclo: new FormControl('', [Validators.required, Validators.min(1)]),
        componente_credito: new FormControl('', [Validators.required, Validators.min(1), Validators.max(4)]),
        componente_area: new FormControl('0', [Validators.required]),
        componente_pde: new FormControl('0', [Validators.required])

      });
    } else {
      const comp = this.componentes.find(el => el.componente_id === id);
      console.log(comp);
      this.form = this.fb.group({
        componente_id: new FormControl(comp.componente_id),
        componente_nombre: new FormControl(comp.componente_nombre, [Validators.required, Validators.minLength(5)]),
        componente_chp: new FormControl(comp.componente_chp, [Validators.required, Validators.min(1)]),
        componente_cht: new FormControl(comp.componente_cht, [Validators.required, Validators.min(1)]),
        componente_ciclo: new FormControl(comp.componente_ciclo, [Validators.required, Validators.min(1)]),
        componente_credito: new FormControl(comp.componente_credito, [Validators.required, Validators.min(1), Validators.max(4)]),
        componente_area: new FormControl(comp.componente_area, [Validators.required]),
        componente_pde: new FormControl(comp.componente_pde, [Validators.required])

      });
    }
    this.add = true;
  }

  saveComponente(flag: number) {
    console.log(flag)

    if (flag === 0) {
      this.createComponente();
    } else {
      this.editComponente(this.form.value.componente_id);
    }

  }

  createComponente() {
    console.log("create")
    this.editing = true;
    let comp = new ComponenteModel();
    comp = Object.assign(comp, this.form.value);
    console.log(comp);
    this.comService.crearComponente(comp).subscribe(res => {
      this.form.reset();
      this.editing = false;
      this.add = false;

    });
  }

  delComponente(e) {
    this.comService.deleteComponente(e).subscribe();
  }

  editComponente(id: string) {
    console.log("edit")

    this.editing = true;
    this.comService.updateComponente(this.form.value, id).subscribe(res => {
      this.form.reset();
      this.editing = false;
      this.add = false;
    });
  }

  get Form() {
    return this.form.controls;
  }

  addG(comp:ComponenteModel){
    this.gpadd = false
    this.componente = comp;
  }

  addGT(cp:ComponenteModel){
    this.gpAdd.emit({id:cp.componente_id, tipo:"GT"})
    this.gpadd = true
    this.componente = null;

  }
  addGP(cp:ComponenteModel){
    this.gpAdd.emit({id:cp.componente_id, tipo:"GP"})
    this.gpadd = true
    this.componente = null;


  }
}
