import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HorarioModel } from 'src/app/models/horario.model';
import { GrupoModel } from 'src/app/models/grupo.model';
import { HorarioService } from 'src/app/services/horario.service';
import { ComponenteModel } from 'src/app/models/componente.model';
interface DialogData {
  hr: HorarioModel;
  gps: GrupoModel[];
  cps: ComponenteModel[];

}
@Component({
  selector: 'app-add-horario',
  templateUrl: './add-horario.component.html',
  styleUrls: ['./add-horario.component.scss']
})
// tslint:disable: variable-name
export class AddHorarioComponent implements OnInit {
  public componenteSelected = '0';
  constructor(
    private _horario: HorarioService,
    public dialogRef: MatDialogRef<AddHorarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _snack: MatSnackBar

  ) { }

  ngOnInit() {
    console.log(this.data.hr);
    if (!this.data.hr.horario_vacio) {
      this.componenteSelected = this.data.hr.horario_grupo;
    }
  }

  save() {
    // console.log(e);
    if (this.componenteSelected == '0') { return; }
    const horario = new HorarioModel();
    horario.horario_grupo = this.componenteSelected;
    horario.horario_vacio = false;
    this._horario.updateHorario(horario, this.data.hr.horario_id).subscribe(
      res => { },
      error => this._snack.open(error.error.detail, 'OK', { duration: 3000 })

    );
  }

}
