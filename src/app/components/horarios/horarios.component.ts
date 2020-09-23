import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { AulaService } from 'src/app/services/aula.service';
import { GrupoService } from 'src/app/services/grupo.service';
import { GrupoModel } from 'src/app/models/grupo.model';
import { Observable, Subscription } from 'rxjs';
import { HorarioService } from 'src/app/services/horario.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AulaModel } from 'src/app/models/aula.model';
import { HorarioModel } from 'src/app/models/horario.model';
import { ComponenteModel } from 'src/app/models/componente.model';
import { ComponenteService } from 'src/app/services/componente.service';
import { getItemLocalCache, Horas } from 'src/app/utils/utils';
import { PlanEstudioModel } from 'src/app/models/planEstudio';
import { PlanEstudioService } from 'src/app/services/plan-estudio.service';
import { CarreraService } from 'src/app/services/carrera.service';
import { CarreraModel } from 'src/app/models/carrera.model';
import { PlanificacionService } from 'src/app/services/planificacion.service';
import { PlanificacionModel } from 'src/app/models/planificacion.model';
import { RecintoModel } from 'src/app/models/recinto.model';
import { RecintoService } from 'src/app/services/recinto.service';
import { HorarioViewModel } from 'src/app/models/reportes/horarioView.model';
import { AddHorarioComponent } from './add-horario/add-horario.component';
import { DocenteService } from 'src/app/services/docente.service';
import { DocenteModel } from 'src/app/models/docente.model';
import { DocenteNamePipe } from 'src/app/pipes/docente-name.pipe';
import { HttpClient } from '@angular/common/http';
import { LogHorarioComponent } from './log-horario/log-horario.component';
import { CompPdeCarreraPipe } from 'src/app/pipes/comp--pde--carrera.pipe';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.scss']
})
export class HorariosCrudComponent implements OnInit, OnDestroy {
  public grupos: GrupoModel[] = [];3
  public componentes: ComponenteModel[] = [];
  public aulas: AulaModel[] = [];
  public horarios: HorarioModel[] = [];
  public horariosByAula: HorarioModel[] = [];
  public carreras: CarreraModel[] = [];
  public planificaciones: PlanificacionModel[] = [];
  public recintos: RecintoModel[] = [];
  public docentes: DocenteModel[] = [];

  public gruposByComp: GrupoModel[] = [];
  public gruposBycarreraAnyo: GrupoModel[] = [];
  public compsByPde: ComponenteModel[] = [];
  public compsByCiclo: ComponenteModel[] = [];
  public pdeByCarrera: PlanEstudioModel[] = [];
  public gruposByPlan: GrupoModel[] = [];
  public gruposFiltrados: GrupoModel[] = [];
  public pdes: PlanEstudioModel[] = [];
  public horas = Horas;
  public selectedR = getItemLocalCache('recinto');
  public pdeSelected = getItemLocalCache("pde");
  public planSelected = getItemLocalCache("planificacion");
  public cicloSelected = getItemLocalCache("ciclo");
  public carreraSelected = getItemLocalCache("carrera");
  public anyoSelected = getItemLocalCache("anyo");
  public planID = '0';
  public HorarioID = '0';
  public gpID = '0';
  public grupoSelected: GrupoModel = null;
  public horarioSelected: HorarioModel = null;
  public aulaSelected = getItemLocalCache('aula');
  public refGP: Observable<any>;
  public refComp: Observable<any>;
  public refAula: Observable<any>;
  public refPde: Observable<any>;
  public refCarrera: Observable<any>;
  public refPla: Observable<any>;
  public refHorario: Observable<any>;
  public refRecintos: Observable<any>;
  public refDocentes: Observable<any>;
  public dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
  public show = false;
  private subs: Subscription[] = [];
  private promesas: Promise<any>[] = [];
  public array: any[][] = [];
  onComponente: any[][] = [];
  public hrChoque: any[]=[];
  public aulaLabel: AulaModel = null;
  public noassign = true;
  public assign = false;

  constructor(private _grupo: GrupoService,
    private _aula: AulaService,
    private _horario: HorarioService,
    private _componente: ComponenteService,
    private _pde: PlanEstudioService,
    private _carrera: CarreraService,
    private _planificacion: PlanificacionService,
    private _recinto: RecintoService,
    private _docente: DocenteService,
    private dialog: MatDialog,
    private _snack: MatSnackBar,
    private docenteName: DocenteNamePipe,
    private http: HttpClient,
    private compPdeCarreraPipe: CompPdeCarreraPipe
  ) {
    if (!this.anyoSelected) {
      this.anyoSelected = '1';
    }
    this.refPde = this._pde.getList();
    this.refCarrera = this._carrera.getList();
    this.refComp = this._componente.getList();
    this.refGP = this._grupo.getList();
    this.refAula = this._aula.getList();
    this.refPla = this._planificacion.getList();
    this.refRecintos = this._recinto.getList();
    this.refHorario = this._horario.getList();
    this.refDocentes = this._docente.getList();
  }

  ngOnInit() {
    // console.log(this.anyoSelected);
    this.servicos();
    this.setCiclo()
    this.setHorariosTable()
    Promise.all(this.promesas).then((res) => {
      // console.log(res);

      // console.log(this.array)
      // this.onComponente[0] = this.componentes;
      // this.onComponente[1] = this.grupos;
      // this._horario.successObten();
      // this.horarioByAula()
      this.subs.push(this.refPde.subscribe(data => this.pdes = data));
      this.subs.push(this.refCarrera.subscribe(data => this.carreras = data));
      this.subs.push(this.refPla.subscribe(data => this.planificaciones = data));
      this.subs.push(this.refHorario.subscribe(data => {
        // this.horarioByAula();

      }));
      this.subs.push(this.refComp.subscribe(data => {
        this.componentes = data;
        this.refRecintos.subscribe((data: RecintoModel[]) => {
          this.recintos = data;
        });
        // this.componentesByCiclo();
      }));
      this.subs.push(this.refGP.subscribe(data => {
        this.grupos = this.onComponente[1] = data;
        // this.pdesByCarrera(this.carreraSelected);
      })
      );
      this.subs.push(this.refDocentes.subscribe(data => this.docentes = data));
      // if (this.carreraSelected !== '0') { this.pdesByCarrera(this.carreraSelected); }
      // if (this.planSelected !== '0') { this.groupsByPlan(this.planSelected); }
      // if (this.aulaSelected != '0') this.horarioByAula(this.aulaSelected);
      this.show = true;
    });
  }

  ngOnDestroy() {
    this._grupo.list = [];
    this._componente.list = [];
    this._aula.list = [];
    this._horario.list = [];
    this._pde.list = [];
    this._carrera.list = [];
    this._planificacion.list = [];
    this._recinto.list = [];
    this._docente.list = [];
    this.subs.forEach(sub => sub.unsubscribe());
    localStorage.setItem('ciclo', this.cicloSelected);
    localStorage.setItem('carrera', this.carreraSelected);
    localStorage.setItem('pde', this.pdeSelected);
    localStorage.setItem('planificacion', this.planSelected);
    localStorage.setItem('recinto', this.selectedR);
    localStorage.setItem('aula', this.aulaSelected);
    localStorage.setItem('anyo', this.anyoSelected);

  }

  pdesByCarrera() {
    return this.pdes.filter(pde => pde.pde_carrera == this.carreraSelected);
  }

  componentesByPde() {
   return this.componentes.filter(comp => comp.componente_pde == this.pdeSelected);
  }
  componentesByCiclo() {
      return this.compsByPde.filter(comp => comp.componente_ciclo.toString() == this.cicloSelected);
  }


  getGrupos() {
    let grupos:GrupoModel[] =[];
    let pdesByCarrera = this.pdes.filter(pde=>pde.pde_carrera == this.carreraSelected);

    // let componentes = this.componentes.reduce((acc,cur)=>{
    //   if(pdesByCarrera.includes(cur.componente_pde))
    //   return acc
    // },[]=[])
    let carrera = this.carreras.find(cr=>cr.carrera_id == this.carreraSelected)
    this.grupos.forEach(gp=>{
        let car = this.compPdeCarreraPipe.transform(gp.grupo_componente, this.componentes, pdesByCarrera, [carrera])
        if(car.carrera_id){
          grupos.push(gp)
        }
    }
    )
    console.log(grupos);

    this.gruposBycarreraAnyo   = grupos;

  }


  getAulas(id: string) {
    if (id != "0") {
      this.aulas = [];
      this.aulas = this._aula.list.filter(aula => aula.aula_recinto === id);
    } else {
      this.aulas = this._aula.list;
    }

  }
  openDialog(horario: HorarioModel, grupos: GrupoModel[]): void {
    this.dialog.open(AddHorarioComponent, {
      width: '850px', maxHeight: '600px',
      data: { hr: horario, gps: grupos, cps: this.onComponente }
    });
  }
  selectH(e, hr: HorarioModel) {
    // if(e.target.localName != 'td') return
    this.changeColor(e);
    this.horarioSelected = hr;
    console.log(this.horarioSelected);
    if (this.grupoSelected == null) return;
    this.save();

  }

  selectGP(e, gp: GrupoModel) {
    this.changeColor(e);
    this.grupoSelected = gp;
    if (this.horarioSelected == null) return;
    this.save();
  }

  changeColor(e) {
    let item = document.getElementsByClassName('bg-color-yellow')[0];
    if (item) {
      let elr = new ElementRef(item);
      elr.nativeElement.classList.remove('bg-color-yellow');
    }
    e.target.classList.add('bg-color-yellow');
  }
  save() {
    console.log(this.grupoSelected, this.horarioSelected);
    this.horarioSelected.horario_grupo = this.grupoSelected.grupo_id;
    this.horarioSelected.horario_vacio = false;
    this.grupoSelected.grupo_asignado = true;
    this.grupoSelected.grupo_horas_clase -= 2;
    if (this.horarioSelected.horario_id != null) {
      let sub = this._horario.updateHorario(this.horarioSelected, this.horarioSelected.horario_id).subscribe(
        res => {
          this.fun();
          // this.groupsByPlan(this.planSelected);
          // let sub = this._grupo.updategrupo(this.grupoSelected, this.grupoSelected.grupo_id).subscribe();
          // this.horarioSelected = this.grupoSelected = null;
          // this.subs.push(sub);
        },
        error => { this._snack.open(error.message, "OK", { duration: 3000 }); this.horarioSelected = this.grupoSelected = null; }
      );
      this.subs.push(sub);
    }
    if (this.horarioSelected.horario_id == null){
      let sub = this._horario.crearHorario(this.horarioSelected).subscribe(
        res => {
          this.fun();
          // this.groupsByPlan(this.planSelected);
          // let sub = this._grupo.updategrupo(this.grupoSelected, this.grupoSelected.grupo_id).subscribe();
          // this.horarioSelected = this.grupoSelected = null;
          // this.subs.push(sub);
        },
        error => { this._snack.open(error.message, "OK", { duration: 3000 }); this.horarioSelected = this.grupoSelected = null; }
      );
      this.subs.push(sub);
    }
  }

  rmGrupo(hr: HorarioModel) {
    return new Promise((resolve) => {
      console.log(this.grupos);
      let gp = this.grupos.find(gp => gp.grupo_id == hr.horario_grupo);
      // hr.horario_grupo = null;
      let sub = this._horario.deleteHorario(hr.horario_id).subscribe(
        res => {
          this.fun();
          // this.groupsByPlan(this.planSelected);
          gp.grupo_horas_clase += 2;
          gp.grupo_asignado = false;
          let sub = this._grupo.updategrupo(gp, gp.grupo_id).subscribe();
          this.subs.push(sub);
        },
        error => this._snack.open(error.message, "OK", { duration: 3000 })
      );
      this.subs.push(sub);
      resolve()
    })

  }
  horarioByAula() {
    this.horarioSelected = null;
    // this._horario.getHorarioByFilter("horario_aula", id)
    // .subscribe((res :HorarioModel[])=> {
    //   // console.log( res);
    //   this.horarios = res.map(hr =>{
    //     let gpByplan = this.gruposByComp.filter(gp => this.planSelected == gp.grupo_planificacion);
    //     let ghp = gpByplan.find(gp => gp.grupo_id == hr.horario_grupo );
    //     // console.log(hr, ghp);
    //     if(ghp != undefined){
    //       return hr;
    //     }
    //   });
      // this.horarios = res;
      // console.log(this.horarios.l)
      // if(this.horarios.length > 0) this.HorarioID = this.horarios[0].horario_id;
      // console.log(this.HorarioID)
      console.log(this.horarios);

      this.horariosByAula = this.horarios.filter(hr=>hr.horario_aula==this.aulaSelected);
      this.fun();
      this.aulaLabel = this.aulas.find(aula => aula.aula_id == this.aulaSelected);
      // });
    //mocos
  }

  docenteNombre(idGp) {
    let gp = this.grupos.find(gp => gp.grupo_id == idGp);
    if (gp != undefined) {
      if(gp.grupo_docente != null)
      {return this.docenteName.transform(gp.grupo_docente, this.docentes);}
    } else return 'sin docente';
  }

  getGrupo(id) {
    let gp = this.grupos.find(gp => gp.grupo_id == id);
    if (gp != undefined) {
      return this.docenteNombre(gp.grupo_docente)
    } else return 'sin docente'
  }

  getCarrera(idGp) {
    let gp = this.grupos.find(gp => gp.grupo_id == idGp);
    let comp = this.componentes.find(cp => cp.componente_id == gp.grupo_componente);
    let pde = this.pdes.find(pde => pde.pde_id == comp.componente_pde);
    return this.carreras.find(cr => cr.carrera_id == pde.pde_carrera).carrera_nombre;
  }

  choque(hr?: HorarioModel) {
    // console.log('dibujar')
    let head: any = {};
    head['Content-Type'] = 'application/json';
    this.horarios.forEach( hr =>{
      if(hr.horario_grupo != null){
      //  if( this.grupos.find(gp=> gp.grupo_id == hr.horario_grupo).grupo_docente == null) return;
        let gp = this.grupos.find(gp=> gp.grupo_id == hr.horario_grupo);
        let cp = this.componentes.find(cp => cp.componente_id ==  gp.grupo_componente)
        hr.horario_ciclo = cp.componente_ciclo + '';
        this.http.post('http://localhost:8000/api/horario/choques',
          {
            "busqueda": {
              choque: 'Docente',
              horario_hora: hr.horario_hora,
              horario_dia: hr.horario_dia,
              horario_planificacion: gp.grupo_planificacion,
              horario_docente: gp.grupo_docente,
              horario_componente: cp.componente_id,
              horario_ciclo: cp.componente_ciclo,
              horario_pde: cp.componente_pde

            }
          }, head)
          .toPromise()
          .then((res: any) => {
            if (res.detail) return
            console.log('choques', res);
            if (res.horario.length > 1) {
              switch (res.tipo) {
                case 'd':
                  hr.horario_choque = 'd';
                  hr.horario_infochoque = res.horario;
                  break;
                case 'c':
                  hr.horario_choque = 'c';
                  hr.horario_infochoque = res.horario;
                  break;
                case 'a':
                  hr.horario_choque = 'a';
                  hr.horario_infochoque = res.horario;
                  break;
              }
            }

          })
      }
    })//forEach
  }

  infoChoque(hr: HorarioModel) {
    this.dialog.open(LogHorarioComponent, {
      width: '450px',
      data: { hr: hr, gps: this.grupos, cps: this.componentes, aulas: this.aulas, recintos: this.recintos }
    });
  }

  fun() {
    const dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];
    const horas = [7, 9, 11, 13, 15, 17];
    let i = 0; let j = 0;

    for (let aux = 0; aux < 6; aux++) {
      this.array[aux] = [];
    }
    for (let aux = 0; aux < 5; aux++) {
      for (let aux2 = 0; aux2 < 6; aux2++) {
        const vacio = new HorarioViewModel();
        vacio.horario_aula = this.aulaSelected;
        vacio.horario_vacio = true;
        vacio.horario_dia = dias[aux];
        vacio.horario_hora = horas[aux2];
        vacio.grupo = null;
        this.array[aux2][aux] = vacio;
      }
    }
    console.log(this.horariosByAula);
    for (const dia of this.horariosByAula) {
      if(dia == undefined) return;
      switch (dia.horario_dia) {
        case 'Lunes': i = 0; break;
        case 'Martes': i = 1; break;
        case 'Miercoles': i = 2; break;
        case 'Jueves': i = 3; break;
        case 'Viernes': i = 4; break;
        default: console.log('No such day exists!', dia); break;
      }
      switch (dia.horario_hora) {
        case 7: j = 0; break;
        case 9: j = 1; break;
        case 11: j = 2; break;
        case 13: j = 3; break;
        case 15: j = 4; break;
        case 17: j = 5; break;
        default: console.log('No such hour exists!', dia); break;
      }
      this.array[j][i] = dia;
      i = 0;
      j = 0;
    }
    this.choque()
  }
  servicos() {
  //  let p3 = this.getHorariosByPlanificacion()

  //  let p1 = this.getGruposByCarreraPlanCiclo()

    let p2 = new Promise((resolve, reject) => {
      let sub = this._aula.getAula()
        .subscribe(
          res => this.aulas.push(res),
          error => this._snack.open(error.message, "OK", { duration: 3000 }),
          () => resolve()
        );
      this.subs.push(sub);
    });


    let p4 = new Promise((resolve, reject) => {
      let sub = this._componente.getComponentes()
        .subscribe(
          res => this.componentes.push(res),
          error => this._snack.open(error.message, "OK", { duration: 3000 }),
          () => resolve()
        );
      this.subs.push(sub);

    });

    let p5 = new Promise((resolve, reject) => {
      let sub = this._pde.getPlanEstudio()
        .subscribe(
          res => this.pdes.push(res),
          error => this._snack.open(error.message, "OK", { duration: 3000 }),
          () => resolve()
        );
      this.subs.push(sub);
    });

    let p6 = new Promise((resolve, reject) => {
      let sub = this._carrera.getCarrera()
        .subscribe(
          res => this.carreras.push(res),
          error => this._snack.open(error.message, "OK", { duration: 3000 }),
          () => resolve()
        );
      this.subs.push(sub);
    });

    let p7 = new Promise((resolve, reject) => {
      let sub = this._planificacion.getPlanificaciones()
        .subscribe(
          res => this.planificaciones.push(res),
          error => this._snack.open(error.message, "OK", { duration: 3000 }),
          () => resolve()
        );
      this.subs.push(sub);
    });
    const p8 = new Promise((resolve) => {
      this._recinto.getRecinto()
        .subscribe(
          res => this.recintos.push(res),
          error => this._snack.open(error.message, 'OK', { duration: 3000 }),
          () => resolve()

        );
    });
    const p9 = new Promise((resolve, reject) => {
      const sub = this._docente.getDocente()
        .subscribe(
          res => this.docentes.push(res),
          error => this._snack.open(error.message, 'OK', { duration: 3000 }),
          () => resolve()
        );
      this.subs.push(sub);
    });
    // this.promesas.push( p1, p2, p3,p4, p5, p6, p7, p8, p9);
    this.promesas.push(  p2, p4, p5, p6, p7, p8, p9);


      // this.horarioByAula()

  }

  setHorariosTable(gpsAssig = false){
    let p3 = this.getHorariosByPlanificacion()

    let p1 = this.getGruposByCarreraPlanCiclo()

    Promise.all([p1,p3]).then((res) => {
      // console.log(this.array)
      this.onComponente[0] = this.componentes;
      this.onComponente[1] = this.grupos;
      this._horario.successObten();
      this.horarioByAula()
      this.getGrupos()

    })

  }

  getHorariosByPlanificacion(){
    // console.log("getHorariosByPlanificacion");

    if(!this.planSelected)return new Promise((resolve, reject) =>resolve())
    return new Promise((resolve, reject) => {
      let sub = this._horario.getByFiltro("horario_planid",this.planSelected)
        .subscribe(
          res =>{
           this.horarios= res.horario
        },

          error => this._snack.open(error.message, "OK", { duration: 3000 }),
          ()=>resolve()
        );
      this.subs.push(sub);
    });
  }

  getGruposByCarreraPlanCiclo(){
      return new Promise((resolve, reject) => {

      let sub = this._grupo.getByFiltro("grupo_planificacion",this.planSelected )
      .subscribe(
        res => {
          // console.log(res);
          this.grupos = res.grupo
        },
        error => this._snack.open(error.message, "OK", { duration: 3000 }),
        () => resolve()
      );
      this.subs.push(sub);
})

  }

  setCiclo(){
    let planificacion = this.planificaciones.find(pl => pl.planificacion_id ==this.planSelected)
    if(planificacion){
      switch (this.anyoSelected) {
        case '1':
         this.cicloSelected = planificacion.planificacion_semestre == '1' ? '1': '2'
          break;
        case '2':
         this.cicloSelected = planificacion.planificacion_semestre == '1' ? '3': '4'
            break;
        case '3':
         this.cicloSelected = planificacion.planificacion_semestre == '1' ? '5': '6'
            break;
        case '4':
         this.cicloSelected = planificacion.planificacion_semestre == '1' ? '7': '8'
                break;
        case '5':
         this.cicloSelected = planificacion.planificacion_semestre == '1' ? '9': '10'
                  break;

      }
    }
  }

}
