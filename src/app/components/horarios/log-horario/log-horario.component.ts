import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { HorarioModel } from 'src/app/models/horario.model';
import { GrupoModel } from 'src/app/models/grupo.model';
import { ComponenteModel } from 'src/app/models/componente.model';
import { AulaModel } from 'src/app/models/aula.model';
import { RecintoModel } from 'src/app/models/recinto.model';
import { HorarioService } from 'src/app/services/horario.service';
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
export class LogHorarioComponent implements OnInit {
  public grupos: GrupoModel[]=[]
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private _horario: HorarioService) { }

  ngOnInit() {
    this.grupos = this.data.hr.horario_infochoque.reduce(this.reducer.bind(this),[])
  }

  reducer(previus, current:HorarioModel){
     previus.push(this.data.gps.find(gp=> gp.grupo_id == current.horario_grupo))
     
     return previus;
  }

  async getAula(id){
    let hr = null;
    let r = await this._horario.getHorarioByFilter("horario_grupo", id).toPromise()[0]
    console.log(r)
    return this.data.aulas.find(au => au.aula_id == r.horario_aula).aula_nombre;
  }
  
  getRecinto(){
    return this.data.recintos.find(re => re.recinto_id == this.data.aulas.find(au => au.aula_id == this.data.hr.horario_aula).aula_recinto).recinto_nombre
  }

}
