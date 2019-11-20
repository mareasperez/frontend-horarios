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

@Injectable({
  providedIn: 'root'
})
export class WsService {
  socket: WebSocket;

  constructor(private facultaService: FacultadSerivice,
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
              private AulaService: AulaService
    ) { }


    setsock() {
      this.socket = new WebSocket(`ws://${ip}:8000/ws/?token=${this.jwt.Token}`);

      this.socket.onopen = () => {
        console.log('WebSockets connection created for Socket Service');
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
          case 'docente_hora':
            this._doho.updateList(action);
            break;
          case 'docente_area':
            this._dcAr.updateList(action)
            break;
          case 'aula':
            this.AulaService.updateList(action);
            break;
        }
      };

      if (this.socket.readyState === WebSocket.OPEN) {
        this.socket.onopen(null);
      }
    }


}
