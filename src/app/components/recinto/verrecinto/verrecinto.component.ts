import { Component, OnInit } from '@angular/core';
import { RecintoModel } from 'src/app/models/recinto.model';
import { RecintoService } from 'src/app/services/recinto.service';
import { MatDialog } from '@angular/material';
import { AddrecintoComponent } from '../addrecinto/addrecinto.component';

@Component({
  selector: 'app-verrecinto',
  templateUrl: './verrecinto.component.html',
  styleUrls: ['./verrecinto.component.css']
})
export class VerrecintoComponent implements OnInit {
  public recintos: RecintoModel[] = [];
  public alerts = true;
  public dataSource;
  displayedColumns: string[] = ['id', 'nombre', 'ubicacion', 'recinto_facultad', 'opciones'];
  socket: WebSocket;
  // tslint:disable-next-line: no-shadowed-variable
  constructor(private RecintoService: RecintoService,
              private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getRecinto();
    // this.setsock();
  }
  getRecinto() {
    this.recintos = [];
    this.RecintoService.getRecinto().subscribe(
      res => {
        this.recintos.push(res);
        this.alerts = false;
        console.log(this.recintos);
        this.dataSource = this.recintos;
        console.log(this.dataSource);
      },
      err => {
        console.error(err);
      }
    );
  }
  openDialog(tipo, id?): void {
    if (tipo === 'c') {
      const dialogRef = this.dialog.open(AddrecintoComponent, {
        width: '450px',
        data: { type: tipo }
      });
    } else {
      console.log('e l tipo es', tipo);
      const recinto = this.recintos.find(d => d.recinto_id === id);
      const dialogRef = this.dialog.open(AddrecintoComponent, {
        width: '450px',
        data: { type: tipo, rec: recinto }
      });
    }
  }
  deleteRecinto(id: string) {
    this.RecintoService.deleteRecinto(id).subscribe(
      res => {
        console.log(res);
        this.getRecinto();
      },
      err => console.log(err)
    );
  }
}
