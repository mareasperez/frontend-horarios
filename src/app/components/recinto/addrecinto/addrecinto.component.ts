import { Component, OnInit, HostBinding } from '@angular/core';
import { RecintoModel } from 'src/app/models/recinto.model';
import { RecintoService } from '../../../services/recinto.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-addrecinto',
  templateUrl: './addrecinto.component.html',
  styleUrls: ['./addrecinto.component.css']
})
export class AddrecintoComponent implements OnInit {
  @HostBinding('class') classes = 'row';

  recinto = new RecintoModel();
  edit = false;

  constructor(private recintoService: RecintoService, private route: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    if (this.activatedRoute.snapshot.url[1].path === 'edit'){
      if (params.id) {
        this.recintoService.getRecintoByID(params.id)
          .subscribe(
            res => {
              console.log(res);
              this.recinto.id = res.id;
              this.recinto.nombre = res.nombre;
              this.recinto.ubicacion = res.ubicacion;
              this.recinto.recinto_facultad = params.id;
              this.edit = true;
            },
            err => console.error(err)
          )
      }
    }
  }

  saveRecinto() {
    // console.log(this.facultad);
    this.recinto.recinto_facultad = this.activatedRoute.snapshot.params.id;
    this.recintoService.crearRecinto(this.recinto)
      .subscribe(
        res => {
          console.log(res);
          this.route.navigate(['/recinto/ver'])
        },
        err => console.error(err)
      )
  }
  updateRecinto() {
    // console.log(this.facultad);
    this.recintoService.updateRecinto(this.recinto, this.activatedRoute.snapshot.params.id)
      .subscribe(
        res => {
          console.log(res);
          this.route.navigate(['/recinto/ver'])
        },
        err => console.error(err)
      )
  }

}
