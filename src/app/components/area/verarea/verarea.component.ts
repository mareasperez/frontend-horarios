import { Component, OnInit, OnDestroy } from '@angular/core';
import { AreaService } from 'src/app/services/area.service';
import { AreaModel } from 'src/app/models/area.model';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import {AddareaComponent} from '../addarea/addarea.component'

@Component({
  selector: 'app-verarea',
  templateUrl: './verarea.component.html',
  styleUrls: ['./verarea.component.scss']
})
export class VerareaComponent implements OnInit, OnDestroy {
  public areas: AreaModel[] = [];

// tslint:disable-next-line: no-shadowed-variable
  public ref:Observable<any[]>;
  public refArea:Observable<any[]>;
  sub:Subscription;
  constructor(private  _area: AreaService,
              private dialog: MatDialog
    ) { 
    this._area.getAreas().subscribe(res=>this.areas.push(res))
    this.refArea = this._area.getList();
  }

  ngOnInit() {
    this.refArea.subscribe(data=>{
      console.log(data)
      this.areas=[];
      this.areas = data;
    });
  }

  ngOnDestroy(){
    this._area.list = []
    if(this.sub !==undefined){
      this.sub.unsubscribe()
    }
  }

  delArea(id){
    this.sub = this._area.deleteArea(id).subscribe()
  }
  
  openDialog(tipo, nombre?, id?): void {
    if(tipo === 'c'){
      const dialogRef = this.dialog.open(AddareaComponent, {
        width: '450px',
        data: {type:tipo}      
      });
    }else{
      const dialogRef = this.dialog.open(AddareaComponent, {
        width: '450px',
        data: {type:tipo, name:nombre, id:id}      
      });
    }
  }
}
