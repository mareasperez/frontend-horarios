import { Component, OnInit, OnDestroy } from '@angular/core';
import { ComponenteService } from 'src/app/services/componente.service';
import { Subscription, Observable } from 'rxjs';
import { ComponenteModel } from 'src/app/models/componente.model';
import { PlanEstudioModel } from 'src/app/models/planEstudio';
import { PlanEstudioService } from 'src/app/services/plan-estudio.service';

@Component({
  selector: 'app-componentes-list',
  templateUrl: './componentes-list.component.html',
  styleUrls: ['./componentes-list.component.scss']
})
export class ComponentesListComponent implements OnInit, OnDestroy {

  public refComp:Observable<any>
  public componentes:ComponenteModel[]=[]
  public pdes:PlanEstudioModel[]=[]
  private subs:Subscription[]=[]
  public show = false;
  private promesas: Promise<any>[]=[];
  public dataSource = [];
  public pdeSelected = "0"

  displayedColumns: string[] = [ 'nombre', 'area', 'thoras', 'phoras', 'ciclo', 'creditos'];


  constructor(private _comp:ComponenteService,
              private _pde:PlanEstudioService,

    
  ) {
    const p1 = new Promise((resolve,reject)=>{
      const sub =  this._pde.getPlanEstudio()
      .subscribe(
        res => this.pdes.push(res),
        error => reject(error),
        ()=>resolve()
      );
      this.subs.push(sub)
    });
    const p2 = new Promise((resolve,reject)=>{
      const sub =  this._comp.getComponentes()
      .subscribe(
        res => this.componentes.push(res),
        error => reject(error),
        ()=>resolve()
      );
      this.subs.push(sub)
    });

    this.promesas.push(p1,p2);
    this.refComp = this._comp.getList();
   }

  ngOnInit() {
    Promise.all(this.promesas).then(()=>{
      this.show = true
      this.subs.push(this.refComp
        .subscribe(data=>{
          this.componentes = data;
       })
      )
    })
  }

  ngOnDestroy(){
    this._comp.list = []
    this.subs.forEach(sub=>sub.unsubscribe())
  }

  componentesByPde(id:string){
    console.log(id)
    let compsByPde = this.componentes.filter(comp=>comp.componente_pde === id);
    this.dataSource = compsByPde

  }

}
