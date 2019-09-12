import { Component, OnInit, HostBinding } from '@angular/core';
import { AulaModel } from 'src/app/models/aula.model';
import { AulaService } from 'src/app/services/aula.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { RecintoModel } from 'src/app/models/recinto.model';
import { RecintoService } from 'src/app/services/recinto.service';

@Component({
  selector: 'app-addaula',
  templateUrl: './addaula.component.html',
  styleUrls: ['./addaula.component.scss']
})
export class AddaulaComponent implements OnInit {
  public ref: Observable<any[]>;
  public Recintos: RecintoModel[] = [];
  @HostBinding('class') classes = 'row';

  aula = new AulaModel();
  edit = false;

  constructor(private aulaService: AulaService,
              private route: Router,
              private activatedRoute: ActivatedRoute,
              private recintoS: RecintoService,
  ) {
    this.recintoS.getRecinto().subscribe(res => this.Recintos.push(res));
    this.ref = this.recintoS.getList();
  }

  ngOnInit() {
    this.ref.subscribe(data => {
      this.Recintos = data;
      console.log('la data es: ', data);
    });
    this.ref.subscribe(data => this.Recintos = data);
    const params = this.activatedRoute.snapshot.params;
    console.log(this.activatedRoute.snapshot.url[1].path);
    this.aula.aula_id = null;
    if (this.activatedRoute.snapshot.url[1].path === 'edit') {
      if (params.id) {
        this.edit = true;
        this.aulaService.getAulaByID(params.id)
          .subscribe(
            res => {
              console.log('lo que tiene res es', res);
              this.aula.aula_id = this.activatedRoute.snapshot.params.id;
              this.aula.aula_nombre = res.aula.aula_nombre;
              this.aula.aula_capacidad = res.aula.aula_capacidad;
              this.aula.aula_tipo = res.aula.aula_tipo;
              this.aula.aula_recinto = res.aula.aula_recinto;
            },
            err => console.error(err)
          );
      }
    }
  }

  saveAula() {
    // console.log(this.facultad);
   // this.aula.aula_recinto = this.activatedRoute.snapshot.params.id;
    this.aulaService.crearAula(this.aula)
      .subscribe(
        res => {
          console.log(res);
          this.route.navigate(['/aula/ver']);
        },
        err => console.error(err)
      );
  }
  updateAula() {
    console.log('si entro al update');
    this.aulaService.updateAula(this.aula, this.aula.aula_recinto)
      .subscribe(
        res => {
          console.log(res);
          this.route.navigate(['/aula/ver']);
        },
        err => console.error(err)
      );
  }

}
