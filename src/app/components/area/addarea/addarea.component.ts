import { Component, OnInit, HostBinding, Inject } from '@angular/core';
import { AreaModel } from 'src/app/models/area.model';
import { AreaService } from 'src/app/services/area.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

interface DialogData{
  type:string;
  name:string
  id?:string
}
@Component({
  selector: 'app-addarea',
  templateUrl: './addarea.component.html',
  styleUrls: ['./addarea.component.scss']
})
export class AddareaComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  area = new AreaModel();
  edit = false;

  constructor(private areaService: AreaService,
    public dialogRef: MatDialogRef<AddareaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
              
    ) { }

  ngOnInit() {}

   
}
