import { Component, OnInit } from '@angular/core';
import { AulaModel } from 'src/app/models/aula.model';
import { AulaService } from 'src/app/services/aula.service';
import { DocenteModel } from 'src/app/models/docente.model';
import { DocenteService } from 'src/app/services/docente.service';
import { GrupoService } from 'src/app/services/grupo.service';
import { GrupoModel } from 'src/app/models/grupo.model';
import { PlanificacionService } from 'src/app/services/planificacion.service';
import { ComponenteService } from 'src/app/services/componente.service';
import { ComponenteModel } from 'src/app/models/componente.model';
import { PlanEstudioModel } from 'src/app/models/planEstudio';
import { MatSnackBar } from '@angular/material';
import { PlanificacionModel } from 'src/app/models/planificacion.model';
import { getItemLocalCache, setItemLocalCache } from 'src/app/utils/utils';
import { HorarioService } from 'src/app/services/horario.service';
import { HorarioModel } from 'src/app/models/horario.model';
import { RecintoModel } from 'src/app/models/recinto.model';
import { RecintoService } from 'src/app/services/recinto.service';
import { PlanEstudioService } from 'src/app/services/plan-estudio.service';
import { CarreraModel } from 'src/app/models/carrera.model';
import { CarreraService } from 'src/app/services/carrera.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-horarios-anyo',
  templateUrl: './horarios-anyo.component.html',
  styleUrls: ['./horarios-anyo.component.scss']
})
export class HorariosAnyoComponent implements OnInit {

  // muestra la animacion de carga
  public isLoaded = false;
  public hLoaded = false;
  // años aceptados
  anyos = [1, 2, 3, 4, 5];
  // listas de datos llenadas por el api
  private promesas: Promise<any>[] = [];
  public docentes: DocenteModel[] = [];
  public planificaciones: PlanificacionModel[] = [];
  public horarios: HorarioModel[] = [];
  public grupos: GrupoModel[] = [];
  public componentes: ComponenteModel[] = [];
  public aulas: AulaModel[] = [];
  public recintos: RecintoModel[] = [];
  public pdes: PlanEstudioModel[] = [];
  public carreras: CarreraModel[] = [];
  // temporales
  public array: any[][] = new Array();
  // valores seteados por el usuario
  public selectedPlan: PlanificacionModel;
  public selectedCarr: CarreraModel;
  public selectedAnyo: number = undefined;
  constructor(
    // tslint:disable: variable-name
    private _planificacion: PlanificacionService,
    private _horario: HorarioService,
    private _docente: DocenteService,
    private _snack: MatSnackBar,
    private _grupo: GrupoService,
    private _componente: ComponenteService,
    private _aula: AulaService,
    private _recinto: RecintoService,
    private _pde: PlanEstudioService,
    private _carrera: CarreraService,
    private http: HttpClient
  ) {
    this.promesas.push(
      new Promise((resolve, reject) => {
        this._planificacion.getPlanificaciones().subscribe(
          plan => this.planificaciones.push(plan),
          error => this._snack.open(error, 'OK', { duration: 3000 }),
          () => resolve()
        );
      })
        .then(res => {
          this.selectedPlan = this.planificaciones.find(plan => plan.planificacion_id === getItemLocalCache('planificacion'));
          if (!this.selectedPlan) {
            console.log('no existe planificacion en localStorage, seteando');
            setItemLocalCache('planificacion', this.planificaciones[0].planificacion_id);
            this.selectedPlan = this.planificaciones[0];
          }
        }));
    this.promesas.push(
      new Promise((resolve, reject) => {
        this._docente.getDocente().subscribe(
          docente => this.docentes.push(docente),
          error => this._snack.open(error, 'OK', { duration: 3000 }),
          () => resolve()
        );
      })
    );
    this.promesas.push(
      new Promise((resolve, reject) => {
        this._componente.getComponentes().subscribe(
          componente => this.componentes.push(componente),
          error => this._snack.open(error, 'OK', { duration: 3000 }),
          () => resolve()
        );
      })
    );
    this.promesas.push(
      new Promise((resolve, reject) => {
        this._recinto.getRecinto().subscribe(
          recinto => this.recintos.push(recinto),
          error => this._snack.open(error, 'OK', { duration: 3000 }),
          () => resolve()
        );
      })
    );
    this.promesas.push(
      new Promise((resolve, reject) => {
        this._pde.getPlanEstudio().subscribe(
          pde => this.pdes.push(pde),
          error => this._snack.open(error, 'OK', { duration: 3000 }),
          () => resolve()
        );
      })
    );
    this.promesas.push(
      new Promise((resolve, reject) => {
        this._carrera.getCarrera().subscribe(
          carrera => this.carreras.push(carrera),
          error => this._snack.open(error, 'OK', { duration: 3000 }),
          () => resolve()
        );
      })
    );
    this.promesas.push(
      new Promise((resolve, reject) => {
        this._aula.getAula().subscribe(
          aula => this.aulas.push(aula),
          error => this._snack.open(error, 'OK', { duration: 3000 }),
          () => resolve()
        );
      })
    );
    this.promesas.push(
      new Promise((resolve, reject) => {
        this._pde.getPlanEstudio().subscribe(
          pde => this.pdes.push(pde),
          error => this._snack.open(error, 'OK', { duration: 3000 }),
          () => resolve()
        );
      })
    );


  }
  ngOnInit(): void {

    Promise.all(this.promesas).then(async res => {
      this.isLoaded = true;
    }); // end then
  }
  getGrupos() {
    this.inicializar();
    const head: any = {};
    head['Content-Type'] = 'application/json';
    if (this.selectedPlan && this.selectedCarr && this.selectedAnyo) {
      const ciclo = Number(this.selectedPlan.planificacion_semestre) === 2 ? this.selectedAnyo * 2 : (this.selectedAnyo * 2) - 1;
      this.http.post('http://localhost:8000/api/grupo/busqueda',
        {
          busqueda: {
            carrera: Number(this.selectedCarr.carrera_id),
            ciclo,
            planificacion: Number(this.selectedPlan.planificacion_id)

          }
        }, head)
        .toPromise()
        .then((res: any) => {
          if (!res.detail) {
            this.grupos = Object.assign(this.grupos, res.grupos);
            this.getData();
          }
          else { alert('no hay grupos en el año seleccionado'); }

        });
    }
  }
  getData() {
    // console.log(this.grupos);
    this.rellenar();
    if (this.grupos) {
      this.grupos.map(grupo => {
        new Promise<any>((resolve, reject) => {
          this._horario.getHorarioByFilter('horario_grupo', grupo.grupo_id).subscribe(res => resolve(res));
        })
          .then((horario: HorarioModel[]) => {
            this.fun(horario);
            // console.log(horario);
          })
          .finally(() => {
          });
      });
    }
  }
  rellenar() {
    const vacio = new HorarioModel();
    vacio.horario_vacio = true;
    for (let aux = 0; aux < 6; aux++) {
      this.array[aux] = [];
    }
    for (let aux = 0; aux < 5; aux++) {
      for (let aux2 = 0; aux2 < 6; aux2++) {
        this.array[aux2][aux] = new Array();
        this.array[aux2][aux].push(vacio);
      }
    }
  }
  async fun(horarios: HorarioModel[]) {
    // console.log('recibio: ', horarios);
    let i = 0;
    let j = 0;
    for (const dia of horarios) {
      // console.log(dia);
      switch (dia.horario_dia) {
        case 'Lunes': {
          i = 0;
          break;
        }
        case 'Martes': {
          i = 1;
          break;
        }
        case 'Miercoles': {
          i = 2;
          break;
        }
        case 'Jueves': {
          i = 3;
          break;
        }
        case 'Viernes': {
          i = 4;
          break;
        }
        default:
          {
            console.log('No such day exists!', dia);
            break;
          }
      }
      switch (dia.horario_hora) {
        case 7: {
          j = 0;
          break;
        }
        case 9: {
          j = 1;
          break;
        }
        case 11: {
          j = 2;
          break;
        }
        case 13: {
          // console.log('llego al jueves y se debe meter: ', dia);
          j = 3;
          break;
        }
        case 15: {
          j = 4;
          break;
        }
        case 17: {
          j = 5;
          break;
        }
        default:
          {
            console.log('No such Hour exists!', dia);
            break;
          }
      }
      // console.log(dia);
      const diaView = new HorarioModel();
      // console.log(dia);
      if (!dia.horario_vacio) {
        if (this.array[j][i][0].horario_vacio) {
          this.array[j][i].pop();
          this.array[j][i].push(dia);
        } else {
          this.array[j][i].push(dia);
        }
        i = 0;
        j = 0;
      }
    }
    this.hLoaded = true;
    // console.log(this.array);
  }
  inicializar() {
    this.array = [];
    this.grupos = [];
    this.hLoaded = false;
  }

  mostrar(array: any) {
    console.log('guia para borachos');
    console.log(array);
  }
}
