import { Component, OnInit, HostBinding, Inject, OnDestroy } from '@angular/core';
import { AulaModel } from 'src/app/models/aula.model';
import { AulaService } from 'src/app/services/aula.service';
import { Observable, Subscription } from 'rxjs';
import { RecintoModel } from 'src/app/models/recinto.model';
import { RecintoService } from 'src/app/services/recinto.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matErrorsMessage } from 'src/app/utils/errors';
interface DialogData {
  type: string;
  idr?: string;
  aul?: AulaModel;
  // ref: Observable<any>;
  recintos: RecintoModel[];
}
@Component({
  selector: 'app-addaula',
  templateUrl: './addaula.component.html',
  styleUrls: ['./addaula.component.scss']
})
export class AddaulaComponent implements OnInit, OnDestroy {
  public ref: Observable<any[]>;
  public Recintos: RecintoModel[] = [];
  public form: FormGroup;
  subs: Subscription[] = [];
  aula = new AulaModel();
  public Errors: matErrorsMessage = new matErrorsMessage();
  edit = false;
  constructor(
    private aulaService: AulaService,
    private recintoS: RecintoService,
    public dialogRef: MatDialogRef<AddaulaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder
  ) {
    console.log(this.data.recintos);
    this.Recintos = this.data.recintos;
    this.ref = this.recintoS.getList();
  }

  ngOnInit() {
    this.subs.push(
      this.ref.subscribe(recs => this.Recintos = recs)
    );
    this.createForm();
  }
  ngOnDestroy() {
    this.subs.map(sub => sub.unsubscribe());
  }

  get Form() {
    return this.form.controls;
  }
  createForm(id?: string) {
    if (this.data.type === 'c') {
      this.form = this.fb.group({
        aula_id: null,
        aula_nombre: new FormControl('', [Validators.required,Validators.minLength(2), Validators.maxLength(100)]),
        aula_capacidad: new FormControl('40', [Validators.required, Validators.maxLength(100)]),
        aula_tipo: new FormControl('false', [Validators.required]),
        aula_recinto: new FormControl(this.data.idr, [Validators.required])

      });
    } else {
      this.form = this.fb.group({
        aula_id: this.data.aul.aula_id,
        aula_nombre: new FormControl(this.data.aul.aula_nombre, [Validators.required, Validators.maxLength(100)]),
        aula_capacidad: new FormControl(this.data.aul.aula_capacidad, [Validators.required,Validators.minLength(2), Validators.maxLength(100)]),
        aula_tipo: new FormControl(this.data.aul.aula_tipo, [Validators.required]),
        aula_recinto: new FormControl(this.data.aul.aula_recinto, [Validators.required])
      });
    }
  }

  saveAula() {
    let aul = new AulaModel();
    aul = Object.assign(aul, this.form.value);
    console.log(aul);
    this.subs.push(this.aulaService.crearAula(aul).subscribe(res => this.dialogRef.close()));
  }
  updateAula() {
    console.log('update');
    let aul = new AulaModel();
    aul = Object.assign(aul, this.form.value);
    console.log(aul);
    this.subs.push(
      this.aulaService.updateAula(aul, aul.aula_id)
        .subscribe(res => this.dialogRef.close())
    );
  }
}
