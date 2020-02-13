import { Component, OnInit, HostBinding, Inject, OnDestroy } from '@angular/core';
import { DocenteModel } from 'src/app/models/docente.model';
import { DocenteService } from 'src/app/services/docente.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { DepartamentoModel } from 'src/app/models/departamento.model';
import { Observable, Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { AreaService } from 'src/app/services/area.service';
import { AreaModel } from 'src/app/models/area.model';
import { DocenteAreaService } from 'src/app/services/docente-area.service';
import { DocenteAreaModel } from 'src/app/models/docente.area.model';
import { matErrorsMessage } from 'src/app/utils/errors';
import { getItemLocalCache } from 'src/app/utils/utils';

interface DialogData {
  type: string;
  doc: DocenteModel;
}
@Component({
  selector: 'app-adddocente',
  templateUrl: './adddocente.component.html',
  styleUrls: ['./adddocente.component.scss']
})
// tslint:disable: variable-name
export class AdddocenteComponent implements OnInit, OnDestroy {
  @HostBinding('class') classes = 'row';

  docente = new DocenteModel();
  public departamentos: DepartamentoModel[] = [];
  public areas: AreaModel[] = [];
  public areasSelecteds: string[] = [];
  public doc_areas: DocenteAreaModel[] = [];
  public refDocAreas: Observable<DocenteAreaModel[]>;
  public edit: boolean;
  public subs: Subscription[] = [];
  public form: FormGroup;
  public refDepartamento: Observable<any>;
  public refArea: Observable<any>;
  public Errors: matErrorsMessage = new matErrorsMessage();
  promesas: Promise<any>[] = [];
  constructor(
    private docenteService: DocenteService,
    private departamento$: DepartamentoService,
    private _area: AreaService,
    private _doc_ar: DocenteAreaService,
    public dialogRef: MatDialogRef<AdddocenteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private _snack: MatSnackBar
  ) {
    const p = new Promise<void>((resolve) => {
      this._area.getAreas().subscribe(
        res => this.areas.push(res),
        error => this._snack.open(error.message, 'OK', { duration: 3000 }),
        () => resolve()
      );
    });
    const p2 = new Promise<void>((resolve) => {
      if (this.data.type === 'u') {
        this._doc_ar.getByDocente('docente_id', this.data.doc.docente_id)
          .subscribe(
            res => this.doc_areas.push(res),
            error => this._snack.open(error.message, 'OK', { duration: 3000 }),
            () => resolve()
          );
        this.refDocAreas = this._doc_ar.getList();
      } else {
        resolve();
      }
    });
    this.departamentos = this.departamento$.list;
     console.log(this.departamento$.list);
    this.refArea = this._area.getList();
    this.refDepartamento = this.departamento$.getList();
    this.promesas.push(p, p2);
  }

  ngOnInit() {
    Promise.all(this.promesas).then(() => {
      this.subs.push(this.refDepartamento.subscribe(deps => this.departamentos = deps));
      this.subs.push(this.refArea.subscribe(areas => this.areas = areas));
      if (this.data.type === 'u') {
        this.subs.push(this.refDocAreas.subscribe(doc_a => this.doc_areas = doc_a));
      }
      this.createForm();
    });

  }

  ngOnDestroy() {
    this.areas = [];
    this.departamentos = [];
    this.doc_areas = [];
    // this.docenteService.list = []
    this.subs.map(sub => sub.unsubscribe());
  }

  createForm(id?: string) {
    if (this.data.type === 'c') {
      this.form = this.fb.group({
        docente_id: null,
        docente_nombre: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        docente_inss: new FormControl('', [Validators.required, Validators.min(10000)]),
        docente_tipo_contrato: new FormControl('H', [Validators.required]),
        // docente_departamento: new FormControl(1, [Validators.required])
        docente_departamento: new FormControl(getItemLocalCache("departamento"), [Validators.required])

      });
    } else {
      this.form = this.fb.group({
        docente_id: this.data.doc.docente_id,
        docente_nombre: new FormControl(this.data.doc.docente_nombre, [Validators.required, Validators.maxLength(100)]),
        docente_inss: new FormControl(this.data.doc.docente_inss, [Validators.required, Validators.min(10000)]),
        docente_tipo_contrato: new FormControl(this.data.doc.docente_tipo_contrato, [Validators.required]),
        // docente_departamento: new FormControl(this.data.doc.docente_departamento, [Validators.required])
        docente_departamento: new FormControl(4, [Validators.required])

      });
    }
  }

  saveDocente() {
    let doc = new DocenteModel();
    doc = Object.assign(doc, this.form.value);
    this.subs.push(
      this.docenteService.crearDocente(doc)
        .subscribe(
          res => this.post_areas(res.id),
          error => this._snack.open(error.message, 'OK', { duration: 3000 }),
        )
    );

  }
  updateDocente() {
    let doc = new DocenteModel();
    doc = Object.assign(doc, this.form.value);
    this.subs.push(
      this.docenteService.updateDocente(doc, doc.docente_id)
        .subscribe(
          res => this.post_areas(doc.docente_id),
          error => this._snack.open(error.message, 'OK', { duration: 3000 }),
        )
    );

  }

  post_areas(docenteID) {
    const body = { docenteArea: [{ da_area: this.areasSelecteds }] };
    console.log('areas sel: ', this.areasSelecteds);
    this._doc_ar.client.put(`${this._doc_ar.getUrl()}docente_id=${docenteID}`, body)
      .subscribe(
        res => this.dialogRef.close(),
        error => this._snack.open(error.message, 'OK', { duration: 3000 }),
      );
  }

  add_area(areas) {
    this.areasSelecteds = areas._value;
  }

  get Form() {
    // console.log(this.form.controls);
    return this.form.controls;
  }



}
