import { Injectable } from '@angular/core';
import { FacultadSerivice } from 'src/app/services/facultad.service';
import { RecintoService } from './recinto.service';
import { JwtService } from './jwt.service';
import { ComponenteService } from './componente.service';
import { AreaService } from './area.service';
import { DocenteService } from './docente.service';
import { DepartamentoService } from './departamento.service';
import { PlanEstudioService } from './plan-estudio.service';
import { GrupoService } from './grupo.service';
import { PlanificacionService } from './planificacion.service';
import { CarreraService } from './carrera.service';
import { DocenteHorasService } from './docente-horas.service';
import { AulaService } from './aula.service';
import { DocenteAreaService } from './docente-area.service';
import { Api, ip } from '../models/api.model';
import { HorarioService } from './horario.service';
declare let alertify: any;
@Injectable({
  providedIn: 'root'
})
// tslint:disable: variable-name
// tslint:disable: no-shadowed-variable
export class WsService {
  socket: WebSocket;
  constructor(
    private facultaService: FacultadSerivice,
    private recintoService: RecintoService,
    private componenteService: ComponenteService,
    private area$: AreaService,
    private docente$: DocenteService,
    private pde$: PlanEstudioService,
    private _pnf: PlanificacionService,
    private grupoS: GrupoService,
    private jwt: JwtService,
    private departamento$: DepartamentoService,
    private carrera$: CarreraService,
    private _doho: DocenteHorasService,
    private _dcAr: DocenteAreaService,
    private _horario: HorarioService,
    private AulaService: AulaService
  ) { }
  private MAX_RECONNECTION = 5;
  private contador = 0;

  setsock() {
    this.socket = new WebSocket(`ws://${ip}:8000/ws/?token=${this.jwt.Token}`);
    // console.log((`ws://${ip}:8000/ws/?token=${this.jwt.Token}`));

    this.socket.onopen = () => {
      console.log('WebSockets connection created for Socket Service');
      if (this.contador > 1) {
        alertify.success('WebSocket reconectado, si hay multiples usuarios trabajando es recomendable recargar la pagina');
      }
      this.contador = 1;
    };

    this.socket.onmessage = (event) => {
      const action = JSON.parse(event.data);
      console.log(action);
      switch (action.model) {
        case 'area':
          this.area$.updateList(action);
          break;
        case 'facultad':
          this.facultaService.updateList(action);
          break;
        case 'docente':
          this.docente$.updateList(action);
          break;
        case 'recinto':
          this.recintoService.updateList(action);
          break;
        case 'componente':
          this.componenteService.updateList(action);
          break;
        case 'departamento':
          this.departamento$.updateList(action);
          break;
        case 'plan_de_estudio':
          this.pde$.updateList(action);
          break;
        case 'planificacion':
          this._pnf.updateList(action);
          break;
        case 'carrera':
          this.carrera$.updateList(action);
          break;
        case 'grupo':
          this.grupoS.updateList(action);
          break;
        case 'horario':
          this._horario.updateList(action);
          break;
        case 'docente_hora':
          this._doho.updateList(action);
          break;
        case 'docente_area':
          this._dcAr.updateList(action);
          break;
        case 'aula':
          this.AulaService.updateList(action);
          break;
      }
    };
    this.socket.onclose = () => {
      // connection closed, discard old websocket and create a new one
      if (this.contador != 0 && this.contador <= this.MAX_RECONNECTION) {
        console.log(`reconectando ws intento ${this.contador} de ${this.MAX_RECONNECTION}`);
        this.socket = null;
        const p3 = new Promise((resolve) => {
          alertify.error(`reconectando ws intento ${this.contador} de ${this.MAX_RECONNECTION}`);
          this.contador++;
          setTimeout(() => {
            this.setsock();
          }, 3000 * this.contador);
          resolve();
        });
      } else {
        alertify.confirm('Recargar pagina')
          .set('onok', () => {
            window.location.reload();
          })
          .set({ title: 'Error de conexion' });
      }
    };
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.onopen(null);
    }
  }


}
