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

class cargaDocencia {
  grupo:GrupoModel;
  componente: ComponenteModel;
  docente:DocenteModel;
  carrera:CarreraModel;
  departamento:DepartamentoModel
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
  cargas:cargaDocencia[]=[];
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
       // console.log(res)
       let compontes=[];
       let planes=[];
        let carreras=[];
        let grupos=[]
        this.docentes.forEach(dc=>{
          let gps = this.grupos.filter(gp=>dc.docente_id === gp.grupo_docente)
          if(gps.length>0){
            grupos.push(gps)
          }
        })
    //  console.log(grupos)

        grupos.forEach((pgp:any[],i)=>{
          let arr=[]
          pgp.forEach((gp:GrupoModel,i)=>{
            let carga:cargaDocencia= new cargaDocencia();
            arr.push(this.comp.filter(cp=>cp.componente_id === gp.grupo_componente)[0])
            carga.grupo = pgp[i]
            carga.componente = arr[i]
            this.cargas.push(carga)
          })
        })
      // console.log(this.cargas)
       // console.log(compontes)
        this.cargas.forEach((cg:cargaDocencia)=>{
          planes.push((this.pde.filter(plan=>plan.pde_id === cg.componente.componente_pde)[0]))
        })
        
       //console.log(planes)
        planes.forEach((plan:PlanEstudioModel,i)=>{
          //console.log(this.carreras.filter(cr=>cr.carrera_id === plan.pde_carrera)[0])
          this.cargas[i].carrera = this.carreras.filter(cr=>cr.carrera_id === plan.pde_carrera)[0]
         // this.cargas[i].carrera = carreras[i];
        })
        
        this.cargas.forEach((carga:cargaDocencia,i)=>{
          this.cargas[i].departamento = this.dep.filter(dp=>dp.departamento_id === carga.carrera.carrera_departamento)[0]
          // 
        })
        console.log(this.cargas)

        
      })//end then
  }



}
