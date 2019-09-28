import { Component, OnInit } from '@angular/core';
import { DocenteModel } from 'src/app/models/docente.model';
import { DocenteService } from 'src/app/services/docente.service';
import { AdddocenteComponent } from '../adddocente/adddocente.component';
import { MatDialog } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-verdocente',
  templateUrl: './verdocente.component.html',
  styleUrls: ['./verdocente.component.scss']
})
export class VerdocenteComponent implements OnInit {

  public docentes: DocenteModel[] = [];
  public refDocentes:Observable<any[]>;
  public alerts = true;
  public dataSource;
  subs:Subscription[]=[]
  displayedColumns: string[] = ['id', 'nombre', 'contrato', 'inss', 'departamento', 'opciones'];
  socket: WebSocket;
// tslint:disable-next-line: no-shadowed-variable
  constructor(private DocenteService: DocenteService,
              private dialog: MatDialog 

    ) { 
      this.DocenteService.getDocente().subscribe(res=>{
        console.log(res)
        this.docentes.push(res);
        this.dataSource = this.docentes;

      });
      this.refDocentes = this.DocenteService.getList();
    }

  ngOnInit() {
    this.subs.push( 
      this.refDocentes.subscribe(data=>{
        console.log(data)
        this.dataSource = [];
        this.docentes = data
        data.map(doc=>{
          this.dataSource.push(doc);
        });
      })
  )
}
  
  
  deleteDocente(id: string) {
    this.DocenteService.deleteDocente(id).subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err)
    );
  }

  openDialog(tipo, id?:string): void {
    if(tipo === 'c'){
      const dialogRef = this.dialog.open(AdddocenteComponent, {
        width: '450px',
        data: {type:tipo}      
      });
    }else{
      let docente = this.docentes.find(d=>d.docente_id ===id)
      const dialogRef = this.dialog.open(AdddocenteComponent, {
        width: '450px',
        data: {type:tipo, doc:docente }
      });
    }
  }

}
