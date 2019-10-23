import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecintoModel } from 'src/app/models/recinto.model';
import { RecintoService } from 'src/app/services/recinto.service';
import { MatDialog } from '@angular/material';
import { AddrecintoComponent } from '../addrecinto/addrecinto.component';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-verrecinto',
  templateUrl: './verrecinto.component.html',
  styleUrls: ['./verrecinto.component.scss']
})
export class VerrecintoComponent implements OnInit, OnDestroy {
  public recintos: RecintoModel[] = [];
  public alerts = true;
  public subs: Subscription;
  public visible: boolean;
  public dataSource;
  refRecinto: Observable<any[]>;
  displayedColumns: string[] = ['id', 'nombre', 'ubicacion', 'recinto_facultad', 'opciones'];
  socket: WebSocket;
  // tslint:disable-next-line: no-shadowed-variable
  constructor(private RecintoService: RecintoService,
              private dialog: MatDialog
  ) {
    this.RecintoService.getRecinto().subscribe(
      res => {
        this.recintos.push(res);
        this.alerts = false;
        this.dataSource = this.recintos;
        console.log(this.dataSource);
      },
      err => console.error(err)
    );
    this.refRecinto = RecintoService.getList();

  }

  async ngOnInit() {
    // this.setsock();
    this.refRecinto.subscribe(async data=>{
      console.log(data);

      this.dataSource = [];
      this.recintos = data;
      data.map(recinto => this.dataSource.push(recinto));
    });
    await this.foo().then(
        () => {
          this.visible = true;
    });
  }

  ngOnDestroy(){
    this.RecintoService.list = [];

  }
  async foo() {
    console.log('loading');
    await this.sleep(1000);
    console.log('...');
    await this.sleep(1000);
    await this.sleep(2000);
    console.log('load complete');
  }

  sleep(ms = 0) {
    return new Promise(r => setTimeout(r, ms));
  }

  openDialog(tipo, id?): void {
    if (tipo === 'c') {
      const dialogRef = this.dialog.open(AddrecintoComponent, {
        width: '450px',
        data: { type: tipo }
      });
    } else {
      const recinto = this.recintos.find(d => d.recinto_id === id);
      const dialogRef = this.dialog.open(AddrecintoComponent, {
        width: '450px',
        data: { type: tipo, rec: recinto }
      });
    }
  }
  deleteRecinto(id: string) {
    this.subs = this.RecintoService.deleteRecinto(id).subscribe();
  }
}
