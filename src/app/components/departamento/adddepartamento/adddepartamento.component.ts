import { Component, OnInit, HostBinding, Inject } from '@angular/core';
import { DepartamentoModel } from 'src/app/models/departamento.model';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

interface DialogData {
  type: string;
  name?: string;
  id?: string;
  facultad?: string;
}

@Component({
  selector: 'app-adddepartamento',
  templateUrl: './adddepartamento.component.html',
  styleUrls: ['./adddepartamento.component.scss']
})
export class AdddepartamentoComponent implements OnInit {
  @HostBinding('class') classes = 'row';

  public departamento = new DepartamentoModel();
  edit = false;
  sub: Subscription;

  constructor(private departamentoService: DepartamentoService,
              public dialogRef: MatDialogRef<AdddepartamentoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { }

  ngOnInit() {
    this.departamento.departamento_nombre = this.data.name;
    this.departamento.departamento_facultad = this.data.facultad;
  }

  ngOnDestroy() {
    if (this.sub !== undefined) {
      this.sub.unsubscribe();
    }
  }

  updateDepartamento() {
    console.log('se llama updaye');
    this.departamento.departamento_id = this.data.id;
    this.sub = this.departamentoService.updateDepartamento(this.departamento, this.departamento.departamento_id)
    .subscribe(res => this.dialogRef.close());
  }

  saveDepartamento() {
    this.departamento.departamento_id = null;
    this.sub = this.departamentoService.crearDepartamento(this.departamento).subscribe(res => this.dialogRef.close());

  }

}
