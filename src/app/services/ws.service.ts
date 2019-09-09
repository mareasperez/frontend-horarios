import { Injectable } from '@angular/core';
import { FacultadSerivice } from 'src/app/services/facultad.service'
import { RecintoService } from './recinto.service';
import { JwtService } from './jwt.service';
import { ComponenteService } from './componente.service';
import { AreaService } from './area.service';
@Injectable({
  providedIn: 'root'
})
export class WsService {
  socket: WebSocket;

  constructor(private facultaService:FacultadSerivice,
              private recintoService:RecintoService,
              private componenteService:ComponenteService,
              private area$:AreaService,
              private jwt: JwtService
    ) { }


    setsock() {
      this.socket = new WebSocket(`ws://localhost:8000/ws/?token=${this.jwt.Token}`);
  
      this.socket.onopen = () => {
        console.log('WebSockets connection created for Socket Service');
      };
  
      this.socket.onmessage = (event) => {
        let action = JSON.parse(event.data);
        switch(action.model){
          case 'area':
            this.area$.updateList(action)
          case 'facultad':
            this.facultaService.updateList(action);
            break;
          case 'recinto':
            break;
          case 'componente':
            this.componenteService.updateList(action);

        }
      };
  
      if (this.socket.readyState === WebSocket.OPEN) {
        this.socket.onopen(null);
      }
    }

    
}
