import { Component, OnInit } from '@angular/core';
import { AreaService } from 'src/app/services/area.service';
import { AreaModel } from 'src/app/models/area.model';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import {AddareaComponent} from '../addarea/addarea.component'

@Component({
  selector: 'app-verarea',
  templateUrl: './verarea.component.html',
  styleUrls: ['./verarea.component.scss']
})
export class VerareaComponent implements OnInit {
  public areas: AreaModel[] = [];

// tslint:disable-next-line: no-shadowed-variable
  public ref:Observable<any[]>;
  public refArea:Observable<any[]>;
  constructor(private  _area: AreaService,
              private dialog: MatDialog     
    ) { 
    this._area.getAreas().subscribe(res=>this.areas.push(res))
    this.refArea = this._area.getList();
  }

  ngOnInit() {
    this.refArea.subscribe(data=>{
      this.areas = data;
    });
  }
  
  openDialog(tipo, nombre, id?): void {
    if(tipo === 'c'){

      const dialogRef = this.dialog.open(AddareaComponent, {
        width: '250px',
        data: {type:tipo,}
        
      });
    }
  }
}
