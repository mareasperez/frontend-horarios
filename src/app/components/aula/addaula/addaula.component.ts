import { Component, OnInit, HostBinding } from '@angular/core';
import { AulaModel } from 'src/app/models/aula.model';
import { AulaService } from 'src/app/services/aula.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-addaula',
  templateUrl: './addaula.component.html',
  styleUrls: ['./addaula.component.scss']
})
export class AddaulaComponent implements OnInit {
  @HostBinding('class') classes = 'row';

  aula = new AulaModel();
  edit = false;

  constructor(private aulaService: AulaService, private route: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    console.log(this.activatedRoute.snapshot.url[2].path);
    this.aula.aula_id = null;
    if (this.activatedRoute.snapshot.url[2].path === 'edit') {
      if (params.id) {
        this.edit = true;
        this.aulaService.getAulaByID(params.id)
          .subscribe(
            res => {
              console.log( 'lo que tiene res es', res);
              this.aula.aula_id = this.activatedRoute.snapshot.params.id;
              this.aula.aula_nombre = res.aula.aula_nombre;
              this.aula.aula_capacidad = res.aula.aula_capacidad;
              this.aula.aula_tipo = res.aula.aula_tipo;
              this.aula.aula_recinto = res.aula.aula_recinto;
            },
            err => console.error(err)
          )
      }
    }
  }

  saveAula() {
    // console.log(this.facultad);
    this.aula.aula_recinto = this.activatedRoute.snapshot.params.id;
    this.aulaService.crearAula(this.aula)
      .subscribe(
        res => {
          console.log(res);
          this.route.navigate(['/recinto/aula/ver']);
        },
        err => console.error(err)
      );
  }
  updateAula() {
    console.log('si entro al update');
    this.aulaService.updateAula(this.aula, this.activatedRoute.snapshot.params.id)
      .subscribe(
        res => {
          console.log(res);
          this.route.navigate(['/recinto/aula/ver']);
        },
        err => console.error(err)
      );
  }

}
