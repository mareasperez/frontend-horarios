import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlanEstudioModel } from 'src/app/models/planEstudio';
import { PlanEstudioService } from 'src/app/services/plan-estudio.service';
import { MatDialog } from '@angular/material';
import { AddplanestudioComponent } from '../addplanestudio/addplanestudio.component';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-verplanestudio',
  templateUrl: './verplanestudio.component.html',
  styleUrls: ['./verplanestudio.component.scss']
})
export class VerplanestudioComponent implements OnInit, OnDestroy {

  public pde:PlanEstudioModel[] = [];
  public alerts = true;
  public dataSource;
  private subs:Subscription[]=[];
  public refPde:Observable<any>
  displayedColumns: string[] = ['id', 'nombre', 'anyo', 'carrera', 'opciones'];
  socket: WebSocket;
  constructor(private PlanEstudioService: PlanEstudioService,
              private dialog: MatDialog 

    ) {
    this.subs.push( this.PlanEstudioService.getPlanEstudio().subscribe(plan=>{
        this.pde.push(plan)
        this.dataSource = this.pde;
        })
    );
    this.refPde = this.PlanEstudioService.getList();
      
   }

  ngOnInit() {
   this.subs.push(
      this.refPde.subscribe(data=>{
        this.dataSource = []
        this.pde = data;
        data.map(p=>{
          this.dataSource.push(p)
        })
      })
    )
  }

  ngOnDestroy(){
    this.subs.map(sub=>sub.unsubscribe())
  }

  deletePlanEstudio(id: number) {
    this.subs.push (
      this.PlanEstudioService.deletePde(id)
        .subscribe(
          res => {
          this.dataSource = this.dataSource.filter(p=> p.pde_id != id )
          },
          err => console.log(err)
        )
    )
  }

  openDialog(tipo, id?): void {
    if(tipo === 'c'){
      const dialogRef = this.dialog.open(AddplanestudioComponent, {
        width: '450px',
        data: {type:tipo}      
      });
    }else{

      let pde = this.pde.find(p=>p.pde_id == id)
      const dialogRef = this.dialog.open(AddplanestudioComponent, {
        width: '450px',
        data: {type:tipo, plan:pde}      
      });
    }
  }

  

}
