import { Component, OnInit, HostBinding } from '@angular/core';
import { DocenteModel } from 'src/app/models/docente.model';
import { DocenteService } from 'src/app/services/docente.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-adddocente',
  templateUrl: './adddocente.component.html',
  styleUrls: ['./adddocente.component.scss']
})
export class AdddocenteComponent implements OnInit {
  @HostBinding('class') classes = 'row';

  docente = new DocenteModel();
  edit = false;

  constructor(private docenteService: DocenteService, private route: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.docente.docente_id = null;
    const params = this.activatedRoute.snapshot.params;
    if (this.activatedRoute.snapshot.url[1].path === 'edit') {
      this.edit = true;
      if (params.id) {
        this.docenteService.getByID(params.id)
          .subscribe(
            res => {
              console.log( 'lo que tiene res es', res);
              // this.docente.docente_id = res.docente.docente_id;
              this.docente.docente_nombre = res.docente.docente_nombre;
              this.docente.docente_tipo_contrato = res.docente.docente_tipo_contrato;
              this.docente.docente_inss = res.docente.docente_inss;
              this.docente.docente_departamento = res.docente.docente_departamento;
            },
            err => console.error(err)
          );
      }
    }
  }

  saveDocente() {
    this.docenteService.crearDocente(this.docente)
      .subscribe(
        res => {
          console.log(res);
          this.route.navigate(['/docente/ver']);
        },
        err => console.error(err)
      );
  }
  updateDocente() {
    console.log('estamos en el update prro');
    this.docenteService.updateDocente(this.docente, this.activatedRoute.snapshot.params.id)
      .subscribe(
        res => {
          console.log(res);
          this.route.navigate(['/docente/ver']);
        },
        err => console.error(err)
      );
  }


}
