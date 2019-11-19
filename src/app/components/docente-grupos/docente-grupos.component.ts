import { Component, OnInit, OnDestroy } from '@angular/core';
import { DocenteModel } from 'src/app/models/docente.model';
import { GrupoModel } from 'src/app/models/grupo.model';
import { matErrorsMessage } from 'src/app/utils/errors';
import { Subscription, Observable } from 'rxjs';
import { GrupoService } from 'src/app/services/grupo.service';
import { DocenteService } from 'src/app/services/docente.service';
import { MatSnackBar } from '@angular/material';
import { ComponenteService } from 'src/app/services/componente.service';
import { ComponenteModel } from 'src/app/models/componente.model';
import { DocenteHorasService } from 'src/app/services/docente-horas.service';
import { DocenteHorasModel } from 'src/app/models/docente.horas.model';
import { DepartamentoModel } from 'src/app/models/departamento.model';
import { DepartamentoService } from 'src/app/services/departamento.service';

@Component({
  selector: 'app-docente-grupos',
  templateUrl: './docente-grupos.component.html',
  styleUrls: ['./docente-grupos.component.scss']
})
export class DocenteGruposComponent implements OnInit, OnDestroy {
  public docentes:DocenteModel[]=[];
  public docentesList:DocenteModel[]=[];
  public docGrupos:DocenteModel[]=[];
  public grupos:GrupoModel[]=[];
  public departamentos: DepartamentoModel[]=[];
  public componentes:ComponenteModel[]=[];
  public docHoras: DocenteHorasModel[]=[];
  subs: Subscription[] = [];
  public Errors: matErrorsMessage = new matErrorsMessage();
  private promesas: Promise<any>[] = [];
  public refDocente: Observable<any>
  public refGrupo: Observable<any>
  public refComp: Observable<any>
  public refDcHr: Observable<any>
  public refDep: Observable<any>
  public depSelected = '0'
  constructor(private _grupo:GrupoService,
              private _docente:DocenteService,
              private _dep: DepartamentoService,
              private _dohr: DocenteHorasService,
              private _componete:ComponenteService,
              private _snack: MatSnackBar


  ) {
    const p1 = new Promise((resolve) => {
      const sub = this._docente.getDocente()
        .subscribe(
          res => this.docentes.push(res),
          error => this._snack.open(error.message, 'OK', { duration: 3000 }),
          () => resolve()
        );
      this.subs.push(sub);
    });
    const p2 = new Promise((resolve) => {
      const sub = this._grupo.getGrupos()
        .subscribe(
          res => this.grupos.push(res),
          error => this._snack.open(error.message, 'OK', { duration: 3000 }),
          () => resolve()
        );
        this.subs.push(sub);
        });
        const p3 = new Promise((resolve) => {
          const sub = this._componete.getComponentes()
            .subscribe(
              res => this.componentes.push(res),
              error => this._snack.open(error.message, 'OK', { duration: 3000 }),
              () => resolve()
            );
          this.subs.push(sub);
        }); 
      const p4 = new Promise((resolve) => {
        const sub = this._dohr.getDcHoras()
          .subscribe(
            res => this.docHoras.push(res),
            error => this._snack.open(error.message, 'OK', { duration: 3000 }),
            () => resolve()
          );
        this.subs.push(sub);
      });
      const p5 = new Promise((resolve) => {
        const sub = this._dep.getDepartamento()
          .subscribe(
            res => this.departamentos.push(res),
            error => this._snack.open(error.message, 'OK', { duration: 3000 }),
            () => resolve()
          );
        this.subs.push(sub);
      });
    this.refGrupo = this._grupo.getList();
    this.refDocente = this._docente.getList();
    this.refComp = this._componete.getList();
    this.refDcHr = this._dohr.getList();
    this.refDep = this._dep.getList();
    this.promesas.push(p1,p2,p3,p4,p5)

   }

  ngOnInit() {
    Promise.all(this.promesas).then(()=>{
      this.docentesList = this.docentes;
      let sub = this.refDocente.subscribe(res => {
        this.docentes = res;
      }) 
      let sub2 = this.refGrupo.subscribe(res => {
        this.grupos = res;
      })
      let sub3 = this.refComp.subscribe(res => {
        this.componentes = res;
      })
      let sub4 = this.refDep.subscribe(res => {
        this.departamentos = res;
      }) 
      let sub5 = this.refDep.subscribe(res => {
        this.departamentos = res;
      })
      this.subs.push(sub, sub2, sub3, sub4, sub5);
    })
  }

  ngOnDestroy(){
    this._grupo.list = [];
    this._docente.list = [];
    this._componete.list =[];
    this._dep.list=[];
    this._dohr.list=[]
    this.subs.forEach(sub => sub.unsubscribe());
  }

  gruposDoc(id:string):GrupoModel[]{
    let grupos = this.grupos.filter(gp => gp.grupo_docente === id);
    return grupos
  }

  verGruposDoc(id:string){
    let doc = this.docentes.find(doc => doc.docente_id === id);
    this.docGrupos.push(doc);
    this.docentesList = this.docentesList.filter(el => el.docente_id !== id);
  }

  verTodos(){
    this.docentesList = []
    this.docentes.forEach(doc => this.verGruposDoc(doc.docente_id))
  }

  cerrarTodos(){
    this.docGrupos = [];
    this.docentesList = this.docentes;
  }

  close(id:string){
    let doc = this.docentes.find(doc => doc.docente_id === id);
    this.docentesList.push(doc);
    let index = this.docGrupos.map(el => el.docente_id).indexOf(id);
    this.docGrupos.splice(index, 1);
  }

  removerDoc(id:string){
    let grupo = this.grupos.find(gp => gp.grupo_id === id)
    grupo.grupo_docente = null;

    this._grupo.updategrupo(grupo, id).subscribe(res => {
      
    })
  }

  docenteHoras(id: string){
    let grupos = this.grupos.filter(gp => gp.grupo_docente === id);
    let horas = grupos.reduce(( horas , gp)=> {
      return horas + gp.grupo_horas_clase;  
      },0)

    return horas;
  }

  dohrs(id){
   let doc = this.docHoras.find(doc => doc.dh_docente === id)
   return doc === undefined ? 0 : doc.dh_horas_total
  }

  docByDep(id:string){
    console.log(id)
    if(id === '0'){
      this.delFiltro()
    }else{
      this.docentesList = this.docentes.filter(dc => dc.docente_departamento === id);   
    }
  }

  delFiltro(){
    this.docentesList = this.docentes;
    this.depSelected = '0';
  }

}
