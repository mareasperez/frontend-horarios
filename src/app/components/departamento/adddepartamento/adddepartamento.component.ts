import { Component, OnInit, HostBinding } from '@angular/core';
import { DepartamentoModel } from 'src/app/models/departamento.model';
import { Router, ActivatedRoute } from '@angular/router';
import { DepartamentoService } from 'src/app/services/departamento.service';

@Component({
  selector: 'app-adddepartamento',
  templateUrl: './adddepartamento.component.html',
  styleUrls: ['./adddepartamento.component.scss']
})
export class AdddepartamentoComponent implements OnInit {
  @HostBinding('class') classes = 'row';

  departamento = new DepartamentoModel();
  edit = false;

  constructor(private departamentoService: DepartamentoService, private route: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.departamento.departamento_id = null;
    const params = this.activatedRoute.snapshot.params;
    if (this.activatedRoute.snapshot.url[1].path === 'edit') {
      if (params.id) {
        this.departamentoService.getDepartamentoByID(params.id)
          .subscribe(
            res => {
              console.log( 'lo que tiene res es', res);
              this.departamento.departamento_nombre = res.departamento.departamento_nombre;
              this.departamento.departamento_facultad = res.departamento.departamento_facultad;
              this.edit = true;
            },
            err => console.error(err)
          );
      }
    }
  }

  saveDepartamento() {
    // console.log(this.facultad);
    this.departamento.departamento_facultad = this.activatedRoute.snapshot.params.id;
    this.departamentoService.crearDepartamento(this.departamento)
      .subscribe(
        res => {
          console.log(res);
          this.route.navigate(['/departamento/ver']);
        },
        err => console.error(err)
      );
  }
  updateDepartamento() {
    // console.log(this.facultad);
    this.departamentoService.updateDepartamento(this.departamento, this.activatedRoute.snapshot.params.id)
      .subscribe(
        res => {
          console.log(res);
          this.route.navigate(['/departamento/ver']);
        },
        err => console.error(err)
      );
  }

}
