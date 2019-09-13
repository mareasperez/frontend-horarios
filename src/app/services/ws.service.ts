import { Injectable } from '@angular/core';
import { FacultadSerivice } from 'src/app/services/facultad.service';
import { RecintoService } from './recinto.service';
import { JwtService } from './jwt.service';
import { ComponenteService } from './componente.service';
import { AreaService } from './area.service';
import { DocenteService } from './docente.service';
import { DepartamentoService } from './departamento.service';
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
              private jwt: JwtService,
              private departamento$: DepartamentoService
    ) { }


    setsock() {
      this.socket = new WebSocket(`ws://localhost:8000/ws/?token=${this.jwt.Token}`);

      this.socket.onopen = () => {
        console.log('WebSockets connection created for Socket Service');
      };

      this.socket.onmessage = (event) => {
        const action = JSON.parse(event.data);
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
            break;
          case 'componente':
            this.componenteService.updateList(action);
            break;
          case 'departamento':
            this.departamento$.updateList(action);
            break;
        }
      };

      if (this.socket.readyState === WebSocket.OPEN) {
        this.socket.onopen(null);
      }
    }


}
