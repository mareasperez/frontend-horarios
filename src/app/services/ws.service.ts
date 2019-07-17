import { Injectable } from '@angular/core';
import { FacultadSerivice } from 'src/app/services/facultad.service'
import { RecintoModel } from '../models/recinto.model';
import { RecintoService } from './recinto.service';
import { FacultadModel } from '../models/facultad.model';
@Injectable({
  providedIn: 'root'
})
export class WsService {
  socket: WebSocket;

  constructor(private facultaService:FacultadSerivice,
              private recintoService:RecintoService
    ) { }


    setsock() {
      this.socket = new WebSocket('ws://localhost:8000/ws/');
  
      this.socket.onopen = () => {
        console.log('WebSockets connection created for Facultad');
      };
  
      this.socket.onmessage = (event) => {
        //  var data = JSON.parse(event.data);
        // console.log('data from socket:' + event.data);
        // this.getfacultades()
        console.log(event)
        let action = JSON.parse(event.data);
        /*if (action.event === 'New Facultad' || action.event === 'Delete Facultad' || action.event === 'Update Facultad' ) {
         // this.getfacultades();
        }*/
        console.log('ws envia el evento: ', action);

        switch(action.type){
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
