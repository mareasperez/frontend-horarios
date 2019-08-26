import { Injectable } from '@angular/core';
import { FacultadSerivice } from 'src/app/services/facultad.service'
import { RecintoModel } from '../models/recinto.model';
import { RecintoService } from './recinto.service';
import { FacultadModel } from '../models/facultad.model';
import { JwtService } from './jwt.service';
@Injectable({
  providedIn: 'root'
})
export class WsService {
  socket: WebSocket;

  constructor(private facultaService:FacultadSerivice,
              private recintoService:RecintoService,
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
          case 'facultad':
            let facultad = new FacultadModel();
            facultad = Object.assign(action.data);
            this.facultaService.updateList(action)
            break;
          case 'recinto':
            break;
        }
      };
  
      if (this.socket.readyState === WebSocket.OPEN) {
        this.socket.onopen(null);
      }
    }

    
}
