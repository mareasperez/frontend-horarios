import { Component, OnInit, HostBinding, Inject, OnDestroy } from '@angular/core';
import { AreaModel } from 'src/app/models/area.model';
import { AreaService } from 'src/app/services/area.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';

interface DialogData{
  type:string;
  name?:string
  id?:string
}
@Component({
  selector: 'app-addarea',
  templateUrl: './addarea.component.html',
  styleUrls: ['./addarea.component.scss']
})
export class AddareaComponent implements OnInit, OnDestroy {

  @HostBinding('class') classes = 'row';

  public area = new AreaModel();
  edit = false;
  sub:Subscription;

  constructor(private areaService: AreaService,
    public dialogRef: MatDialogRef<AddareaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
              
    ) { }

  ngOnInit() {
    this.area.area_nombre = this.data.name;
  }

  ngOnDestroy(){
    if(this.sub !==undefined){
      this.sub.unsubscribe()
    }
  }

  updateArea(){
    this.area.area_id = this.data.id
    this.sub = this.areaService.updateArea(this.area, this.area.area_id).subscribe(res=>this.dialogRef.close())
  }

  saveArea(){
    this.area.area_id = null;
    this.sub = this.areaService.crearArea(this.area).subscribe(res=>this.dialogRef.close())

  }

   
}
