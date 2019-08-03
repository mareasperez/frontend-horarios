import { Component, OnInit, HostBinding } from '@angular/core';
import { AreaModel } from 'src/app/models/area.model';
import { AreaService } from 'src/app/services/area.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-addarea',
  templateUrl: './addarea.component.html',
  styleUrls: ['./addarea.component.scss']
})
export class AddareaComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  area = new AreaModel();
  edit = false;

  constructor(private areaService: AreaService, private route: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    console.log(this.activatedRoute.snapshot.url[1].path);
    if (this.activatedRoute.snapshot.url[1].path === 'edit') {
      if (params.id) {
        this.edit = true;
        this.areaService.getByID(params.id)
          .subscribe(
            res => {
              console.log( 'lo que tiene res es', res);
              this.area.area_id = res.area.area_id;
              this.area.area_nombre = res.area.area_nombre;
            },
            err => console.error(err)
          );
      }
    }
  }

  saveArea() {
    // console.log(this.facultad);
    this.areaService.crearArea(this.area)
      .subscribe(
        res => {
          console.log(res);
          this.route.navigate(['/area/ver']);
        },
        err => console.error(err)
      );
  }
  updateArea() {
    // console.log(this.facultad);
    this.areaService.updateArea(this.area, this.activatedRoute.snapshot.params.id)
      .subscribe(
        res => {
          console.log(res);
          this.route.navigate(['/area/ver']);
        },
        err => console.error(err)
      );
  }

}
