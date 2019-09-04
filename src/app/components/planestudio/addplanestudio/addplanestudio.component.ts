import { Component, OnInit, HostBinding } from '@angular/core';
import { PlanEstudioModel } from 'src/app/models/planEstudio';
import { PlanEstudioService } from 'src/app/services/plan-estudio.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-addplanestudio',
  templateUrl: './addplanestudio.component.html',
  styleUrls: ['./addplanestudio.component.scss']
})
export class AddplanestudioComponent implements OnInit {
  @HostBinding('class') classes = 'row';

  planDeEstudio = new PlanEstudioModel();
  edit = false;

  constructor(private planDeEstudioService: PlanEstudioService, private route: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    console.log(this.activatedRoute.snapshot.url[1].path);
    this.planDeEstudio.pde_id = null;
    if (this.activatedRoute.snapshot.url[1].path === 'edit') {
      if (params.id) {
        this.edit = true;
        this.planDeEstudioService.getPlanEstudioByID(params.id)
          .subscribe(
            res => {
              console.log( 'lo que tiene res es', res);
              this.planDeEstudio.pde_nombre = res.planDeEstudio.pde_nombre;
              this.planDeEstudio.pde_anyo = res.planDeEstudio.pde_anyo;
              this.planDeEstudio.pde_carrera = res.planDeEstudio.pde_carrera;
            },
            err => console.error(err)
          )
      }
    }
  }

  savePde() {
    // console.log(this.facultad);
    this.planDeEstudioService.crearPlanEstudio(this.planDeEstudio)
      .subscribe(
        res => {
          console.log(res);
          this.route.navigate(['/planestudio/ver']);
        },
        err => console.error(err)
      );
  }
  updatePde() {
    console.log('si entro al update');
    this.planDeEstudioService.updatePlanEstudio(this.planDeEstudio, this.activatedRoute.snapshot.params.id)
      .subscribe(
        res => {
          console.log(res);
          this.route.navigate(['/planestudio/ver']);
        },
        err => console.error(err)
      );
  }


}
