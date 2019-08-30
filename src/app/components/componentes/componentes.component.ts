import { Component, OnInit } from '@angular/core';
import { ComponenteService } from 'src/app/services/componente.service';
import { Observable } from 'rxjs';
import { ComponenteModel } from 'src/app/models/componente.model';
import { PlanEstudioService } from 'src/app/services/plan-estudio.service';
import { AreaService } from 'src/app/services/area.service';
import { AreaModel } from 'src/app/models/area.model';
import { PlanEstudioModel } from 'src/app/models/planEstudio';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-componentes',
  templateUrl: './componentes.component.html',
  styleUrls: ['./componentes.component.scss']
})
export class ComponentesComponent implements OnInit {
  public ref:Observable<any[]>;
  public refArea:Observable<any[]>;
  public refPde:Observable<any[]>;
  public componentes:ComponenteModel[]=[];
  public areas:AreaModel[]=[];
  public pdes:PlanEstudioModel[]=[];
  public form:FormGroup;
  public selected:string = "0";
  public selected2:string = "0";
  public add:boolean = false;
  public editing:boolean = false;

  constructor(private comService:ComponenteService,
              private _area:AreaService,
              private _pde:PlanEstudioService,
              private fb:FormBuilder

  ) { 
    this.comService.getComponentes().subscribe(res=>this.componentes.push(res));
    this._area.getAreas().subscribe(res=>this.areas.push(res))
    this._pde.getPlanEstudio().subscribe(res=>this.pdes.push(res))
    this.ref = this.comService.getList();
    this.refArea = this._area.getList();
    this.refPde = this._pde.getList();

  }

  ngOnInit() {
    this.ref.subscribe(data=>this.componentes = data);
    this.refArea.subscribe(data=>this.areas = data);
    this.refPde.subscribe(data=>this.pdes = data);
    this.createForm();
  }

  createForm(){
    this.form = this.fb.group({
      componente_id:null,
      componente_nombre: new FormControl('',[Validators.required, Validators.minLength(5)]),
      componente_chp: new FormControl('',[Validators.required, Validators.min(1)]),
      componente_cht: new FormControl('',[Validators.required, Validators.min(1)]),
      componente_ciclo: new FormControl('',[Validators.required, Validators.min(1)]),
      componente_area: new FormControl('',[Validators.required]),
      componente_pde:new FormControl('',[Validators.required])

    })
  }

  createComponente(){
    this.editing = true;
    let comp = new ComponenteModel();
    comp = Object.assign(comp, this.form.value)
    console.log(comp);
    this.comService.crearComponente(comp).subscribe(res=>{
      this.editing = false;
      this.add = false;
    })
  }

}
