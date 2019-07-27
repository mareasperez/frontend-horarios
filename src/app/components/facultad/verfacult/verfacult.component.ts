import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { FacultadSerivice } from 'src/app/services/facultad.service';
import { FacultadModel } from 'src/app/models/facultad.model';
import { MatMenuTrigger } from '@angular/material';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-verfacult',
  templateUrl: './verfacult.component.html',
  styleUrls: ['./verfacult.component.css']
})
export class VerfacultComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  public facultades: FacultadModel[] = [];
  public alerts = true;
  socket: WebSocket;
  @ViewChild(MatMenuTrigger, {static: false})
  contextMenu: MatMenuTrigger;

  contextMenuPosition = { x: '0px', y: '0px' };

  onContextMenu(event: MouseEvent, facultad: FacultadModel) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = {facultad };
    this.contextMenu.openMenu();
  }


  constructor(private facultaService: FacultadSerivice, private route: Router) {

    this.facultaService.getList().subscribe(console.log);
  }

  ngOnInit() {
    this.getfacultades();

  }
  onContextMenuAction2(facultad: FacultadModel) {
    alert(`Click on Action 2 for ${facultad.facultad_nombre}`);
  }
  editarFacultad(id){
    this.route.navigate([`/facultad/edit/${id}`]);
  }
 /* setsock() {
    this.socket = new WebSocket('ws://localhost:8000/ws/');

    this.socket.onopen = () => {
      console.log('WebSockets connection created for Facultad');
    };

    this.socket.onmessage = (event) => {
      //  var data = JSON.parse(event.data);
      // console.log('data from socket:' + event.data);
      // this.getfacultades()
      const action = JSON.parse(event.data);
      if (action.event === 'New Facultad' || action.event === 'Delete Facultad' || action.event === 'Update Facultad' ) {
        this.getfacultades();
      }
      console.log('ws envia el evento: ', action);


    };

    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.onopen(null);
    }
  }*/
  getfacultades() {
    this.facultades = [];
    this.facultaService.getFacultad().subscribe(
      res => {
        this.facultades.push(res);
        this.alerts = false;
        console.log(this.facultades);
      },
      err => {
        console.error(err);
      }
    );
  }
  deleteFaculta(id: string) {
    this.facultaService.deleteFacultad(id).subscribe(
      res => {
        console.log(res);
        this.getfacultades();
      },
      err => console.log(err)
    );
  }
}
