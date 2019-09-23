import { Component, OnInit, HostBinding, Inject } from '@angular/core';
import { RecintoModel } from 'src/app/models/recinto.model';
import { RecintoService } from '../../../services/recinto.service';
import { Subscription, Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FacultadModel } from 'src/app/models/facultad.model';
import { FacultadSerivice } from 'src/app/services/facultad.service';
interface DialogData {
  type: string;
  rec?: RecintoModel;
}
@Component({
  selector: 'app-addrecinto',
  templateUrl: './addrecinto.component.html',
  styleUrls: ['./addrecinto.component.css']
})
export class AddrecintoComponent implements OnInit {
  @HostBinding('class') classes = 'row';

  public recinto = new RecintoModel();
  public facultades: FacultadModel [] = [];
  edit = false;
  subs: Subscription [] = [];
  public selected = '0';
  public form: FormGroup;
  public refFacultad: Observable<any>;

  constructor(private recintoService: RecintoService,
              private facultad$: FacultadSerivice,
              public dialogRef: MatDialogRef<AddrecintoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private fb: FormBuilder
    ) {
      this.facultad$.getFacultad().subscribe(res => this.facultades.push(res));
      this.refFacultad = this.facultad$.getList();
    }

  ngOnInit() {
    this.subs.push(
      this.refFacultad.subscribe(recs => this.facultades = recs)
    );
    this.createForm();
  }

  ngOnDestroy() {
    this.facultad$.list = []
    this.subs.map(sub => sub.unsubscribe());
  }
  createForm( id?: string ) {
    if (this.data.type === 'c') {
      this.form = this.fb.group({
        recinto_id: null,
        recinto_nombre: new FormControl('', [Validators.required]),
        recinto_ubicacion: new FormControl('', [Validators.required]),
        recinto_facultad: new FormControl('', [Validators.required])
      });
    } else {
      this.form = this.fb.group({
        recinto_id: this.data.rec.recinto_id,
        recinto_nombre: new FormControl(this.data.rec.recinto_nombre, [Validators.required]),
        recinto_ubicacion: new FormControl(this.data.rec.recinto_ubicacion, [Validators.required]),
        recinto_facultad: new FormControl(this.data.rec.recinto_facultad, [Validators.required])
      });
    }
  }

  saveRecinto() {
    let rec = new RecintoModel();
    rec = Object.assign(rec, this.form.value);
    console.log(rec);
    this.subs.push(
      this.recintoService.crearRecinto(rec)
      .subscribe(res => this.dialogRef.close())
    );
  }
  updateRecinto() {
    let rec = new RecintoModel();
    rec = Object.assign(rec, this.form.value);
    console.log(rec);
    this.subs.push(
      this.recintoService.updateRecinto(rec, rec.recinto_id)
      .subscribe(res => this.dialogRef.close())
    );
  }

}
