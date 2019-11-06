import { Component, OnInit } from '@angular/core';
import { DocenteService } from 'src/app/services/docente.service';
import { DocenteModel } from 'src/app/models/docente.model';
import { Observable } from 'rxjs';
import { ComponenteService } from 'src/app/services/componente.service';
import { GrupoModel } from 'src/app/models/grupo.model';
import { GrupoService } from 'src/app/services/grupo.service';
import { PlanificacionService } from 'src/app/services/planificacion.service';
import { PlanEstudioService } from 'src/app/services/plan-estudio.service';
import { ReporteCargaModel } from 'src/app/models/rep.carga';
import { RComponent } from '../../../models/rcomponentes';
import { PlanEstudioModel } from 'src/app/models/planEstudio';
import { PlanificacionModel } from 'src/app/models/planificacion.model';
import { ComponenteModel } from 'src/app/models/componente.model';
import { CarreraService } from 'src/app/services/carrera.service';
import { CarreraModel } from 'src/app/models/carrera.model';
import { promise } from 'protractor';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.scss']
})
export class CargaComponent implements OnInit {


  public refDoc: Observable<any[]>;
  // reporte
  public refGr: Observable<any[]>;
  public reportes: ReporteCargaModel[] = [];

  // listas de objetos
  public carreras: CarreraModel[] = [];
  public pdes: PlanEstudioModel[] = [];
  public planficacion: PlanificacionModel[] = [];
  public docentes: DocenteModel[] = [];
  public grupos: GrupoModel[] = [];
  public componentes: ComponenteModel[] = [];
  constructor(
    private _carrera: CarreraService,
    private _docente: DocenteService,
    private _grupos: GrupoService,
    private _planificacion: PlanificacionService,
    private _pde: PlanEstudioService,
    private _componente: ComponenteService,
    private _snack:MatSnackBar
  ) {
    this._grupos.getGrupos()
      .subscribe(
        res => this.grupos.push(res),
        error=>this._snack.open(error.message,"OK",{duration: 3000}),
      );
    this._pde.getPlanEstudio()
      .subscribe(
        res => this.pdes.push(res),
        error=>this._snack.open(error.message,"OK",{duration: 3000}),
      );
    this._componente.getComponentes()
      .subscribe(
        res => this.componentes.push(res),
        error=>this._snack.open(error.message,"OK",{duration: 3000}),
      );
    this._carrera.getCarrera()
      .subscribe(
        res => this.carreras.push(res),
        error=>this._snack.open(error.message,"OK",{duration: 3000}),
      );
    this._docente.getDocente()
      .subscribe(
        res => this.docentes.push(res),
        error=>this._snack.open(error.message,"OK",{duration: 3000}),
      );
    this.refDoc = this._docente.getList();
    this.refGr = this._grupos.getList();
  }

  async ngOnInit() {
    let i = 0;
    console.log('init');
    await this.foo().then(
      () => {
        this.docentes.forEach(docente => {
          console.log('docentes: ', this.docentes);
          this.sinc(docente, i, this.grupos);
          i++;
        });
      });

  }
  async foo() {
    await this.sleep(1000);
    console.log(1);
    await this.sleep(1000);
    await this.sleep(1000);
    console.log(3);
  }

  sleep(ms = 0) {
    return new Promise(r => setTimeout(r, ms));
  }

  sinc(docente: DocenteModel, i: number, grupos) {
    const reporte = new ReporteCargaModel();
    const rr: RComponent[] = [];
    let p = new Promise<any>((resolve, reject) => {
      console.log(docente.docente_nombre);
      reporte.docente = docente.docente_nombre;
      reporte.componente = rr;
      const gr = grupos.filter(grupo => grupo.grupo_docente === docente.docente_id);
      resolve(gr);
    });
    p.then((gr) => {
      console.log('gr', gr);
      gr.forEach(grupo => {
        console.log('entro al foreach');
        // console.log(grupo);
        const rp: RComponent = new RComponent();
        rp.componente = grupo.grupo_componente;
        // console.log('Docente: ', docente.docente_nombre, 'componente: ', rp.componente);
        rp.grupo_numero = grupo.grupo_numero;
        rp.horas = grupo.grupo_horas_clase;
        let p2 = new Promise<any>((resolve, reject) => {
          const comp = this.componentes.filter(componente => componente.componente_id === grupo.grupo_componente);
          resolve(comp);
        });
        p2.then((comp) => {
          // console.log('comp: ', comp);
          rp.componente = comp[0].componente_nombre;
          rp.anyo = comp[0].componente_ciclo;
          let p3 = new Promise<any>((resolve, reject) => {
            const plande = this.pdes.filter(pde => Number(pde.pde_id) === comp[0].componente_pde);
            // console.log('plan antes: ', plande);
            resolve(plande);
          });
          p3.then((plande) => {
            // console.log('plan despues:', plande);
            const carrera = this.carreras.filter(carr => carr.carrera_id === plande[0].pde_carrera);
            rp.carrera = carrera[0].carrera_nombre;
            reporte.componente.push(rp);
            // console.log('rp: ', rp);
            console.log('reporte:', reporte);
          });
        });


      });
      this.reportes.push(reporte);

    });


  }
}

