import { Component, OnInit } from '@angular/core';
import { AreaService } from 'src/app/services/area.service';
import { AreaModel } from 'src/app/models/area.model';

@Component({
  selector: 'app-verarea',
  templateUrl: './verarea.component.html',
  styleUrls: ['./verarea.component.scss']
})
export class VerareaComponent implements OnInit {
  public areas: AreaModel[] = [];
  public alerts = true;
  public dataSource;
  displayedColumns: string[] = ['id', 'nombre', 'opciones'];
  socket: WebSocket;
// tslint:disable-next-line: no-shadowed-variable
  constructor(private AreaService: AreaService) { }

  ngOnInit() {
    this.getArea();
    this.setsock();
  }
  setsock() {
    this.socket = new WebSocket('ws://localhost:8000/ws/');

    this.socket.onopen = () => {
      console.log('WebSockets connection created for Aula');
    };

    this.socket.onmessage = (event) => {
      //  var data = JSON.parse(event.data);
      // console.log('data from socket:' + event.data);
      // this.getRecintoes()
      const action = JSON.parse(event.data);
      if (action.event === 'New Area' || action.event === 'Delete Area' || action.event === 'Update Area' ) {
        console.log('ws envia el evento: ', action.event);
        this.getArea();
      }

    };

    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.onopen(null);
    }
  }
  getArea() {
    this.areas = [];
    this.AreaService.getAreas().subscribe(
      res => {
        this.areas.push(res);
        this.alerts = false;
        console.log(this.areas);
        this.dataSource = this.areas;
        console.log(this.dataSource);
      },
      err => {
        console.error(err);
      }
    );
  }
  deleteArea(id: string) {
    this.AreaService.deleteArea(id).subscribe(
      res => {
        console.log(res);
        this.getArea();
      },
      err => console.log(err)
    );
  }
}
