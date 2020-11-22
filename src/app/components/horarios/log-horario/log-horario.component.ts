import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { HorarioModel } from 'src/app/models/horario.model';
import { GrupoModel } from 'src/app/models/grupo.model';
import { ComponenteModel } from 'src/app/models/componente.model';
import { AulaModel } from 'src/app/models/aula.model';
import { RecintoModel } from 'src/app/models/recinto.model';
import { HorarioService } from 'src/app/services/horario.service';
import { Subscription } from 'rxjs';
interface DialogData {
  hr: HorarioModel;
  gps: GrupoModel[];
  cps: ComponenteModel[];
  aulas: AulaModel[];
  recintos: RecintoModel[];
}
@Component({
  selector: 'app-log-horario',
  templateUrl: './log-horario.component.html',
  styleUrls: ['./log-horario.component.scss']
})
// tslint:disable: variable-name
export class LogHorarioComponent implements OnInit, OnDestroy {
  public grupos: GrupoModel[] = [];
  private subs: Subscription[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private _horario: HorarioService) { }

  ngOnInit() {
    this.grupos = this.data.hr.horario_infochoque.reduce(this.reducer.bind(this), []);
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  reducer(previus, current: HorarioModel) {
    const gp = this.data.gps.find(gp => gp.grupo_id == current.horario_grupo);
    const aula = '';
    this.getAula(gp.grupo_id).then(aula => gp['aula'] = aula);
    previus.push(gp);
    return previus;
  }

  getAula(id) {
    return new Promise((resolve) => {
      const sub = this._horario.getHorarioByFilter('horario_grupo', id).subscribe(res => {
        const aula = this.data.aulas.find(au => au.aula_id == res[0].horario_aula).aula_nombre;
        resolve(aula);
      });
      this.subs.push(sub);
    });
  }

  getRecinto() {
    return this.data.recintos
      .find(re => re.recinto_id == this.data.aulas.find(au => au.aula_id == this.data.hr.horario_aula).aula_recinto).recinto_nombre;
  }

}
