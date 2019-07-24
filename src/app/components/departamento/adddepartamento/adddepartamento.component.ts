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
