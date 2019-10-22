import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ComponenteService } from 'src/app/services/componente.service';
import { CarreraService } from 'src/app/services/carrera.service';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { GrupoService } from 'src/app/services/grupo.service';
import { PlanEstudioService } from 'src/app/services/plan-estudio.service';
import { DepartamentoModel } from 'src/app/models/departamento.model';
import { GrupoModel } from 'src/app/models/grupo.model';
import { ComponenteModel } from 'src/app/models/componente.model';
import { PlanEstudioModel } from 'src/app/models/planEstudio';
import { resolve, reject } from 'q';
import { CarreraModel } from 'src/app/models/carrera.model';
import { DocenteModel } from 'src/app/models/docente.model';
import { DocenteService } from 'src/app/services/docente.service';

interface cargaDocencia{
  docente:DocenteModel;
  componente: ComponenteModel;
  pde:PlanEstudioModel;
  carrera:CarreraModel;
}

@Component({
  selector: 'app-carga-docencia',
  templateUrl: './carga-docencia.component.html',
  styleUrls: ['./carga-docencia.component.scss']
})
export class CargaDocenciaComponent implements OnInit {
  public dataSource;
  public grupos:GrupoModel[]=[];
  private dep:DepartamentoModel[]=[];
  private comp:ComponenteModel[]=[];
  private pde:PlanEstudioModel[]=[];
  private carreras:CarreraModel[]=[];
  private docentes:DocenteModel[]=[];
  private promesas:Promise<any>[]=[];
  subs:Subscription[]=[]
  carga:cargaDocencia;
  counter:any;
  displayedColumns: string[] = ['departamento', 'carga', 'carrera', 'tgrupo', 'thoras'];
  constructor(private _dep:DepartamentoService,
              private _comp:ComponenteService,
              private _carrera:CarreraService,
              private _grupo:GrupoService,
              private _pde:PlanEstudioService,
              private _docente:DocenteService

    ) { 

      this.promesas.push(
        new Promise((resolve)=>{
          this._carrera.getCarrera().subscribe(res=>{
            this.carreras.push(res)
            resolve(this.carreras)
          })
        })
      );    
      this.promesas.push(
        new Promise((resolve)=>{
          this._docente.getDocente().subscribe(res=>{
            this.docentes.push(res)
            resolve(this.docentes)
          })
        })
      );
      this.promesas.push(
        new Promise((resolve)=>{
          this._comp.getComponentes().subscribe(res=>{
            this.comp.push(res)
            resolve(this.comp)

          })
        })
      );
      this.promesas.push(
        new Promise((resolve)=>{
          this._pde.getPlanEstudio().subscribe(res=>{
            this.pde.push(res)
            resolve(this.pde)

          })
        })
      );
      this.promesas.push(
        new Promise((resolve, reject)=>{

          this._grupo.getGrupos().subscribe(res=>{this.grupos.push(res)
       // console.log(this.grupos)
        resolve(this.grupos)
        })

        })
      )
      
      this.promesas.push(
        new Promise((resolve, reject)=>{
      this._dep.getDepartamento().subscribe(res=>{
        this.dep.push(res)
        resolve(this.dep)

      })
    })
    )

    }

  ngOnInit() {
    Promise.all(this.promesas)
      .then(res=>{
        console.log(res)
        let compontes=[];
        let planes=[];
        let carreras=[];
        this.docentes.forEach(dc=>{
          this.counter = this.grupos.filter(gp=>dc.docente_id === gp.grupo_docente)
          console.log(this.counter)
        
        })
        if(this.counter!== undefined){
          this.counter.forEach((gp:GrupoModel)=>{
           compontes.push(this.comp.filter(cp=>gp.grupo_id === cp.componente_id)[0])
          })
          console.log(compontes)
        }
        compontes.forEach((cp:ComponenteModel)=>{
          planes.push((this.pde.filter(plan=>plan.pde_id === cp.componente_pde)[0]))
        })

        planes.forEach((plan:PlanEstudioModel)=>{
          carreras.push((this.carreras.filter(cr=>cr.carrera_id === plan.pde_carrera)[0]))
        })

        carreras.forEach((carrera:CarreraModel)=>{
          console.log(this.dep.filter(dp=>dp.departamento_id === carrera.carrera_departamento))
        })

        
      })//end then
  }



}
