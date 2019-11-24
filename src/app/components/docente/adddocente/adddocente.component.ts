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

  private doc_areas: DocenteAreaModel[] = [];
  edit = false;
  subs: Subscription[] = [];
  public form: FormGroup;
  public refDepartamento: Observable<any>;
  public refArea: Observable<any>;
  public Errors: matErrorsMessage = new matErrorsMessage();
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
    this._area.getAreas().subscribe(
      res => this.areas.push(res),
      error => this._snack.open(error.message, 'OK', { duration: 3000 }),
    );
    this._doc_ar.getDcArea()
      .subscribe(
        res => this.doc_areas.push(res),
        error => this._snack.open(error.message, 'OK', { duration: 3000 }),
      );
    this.departamentos = this.departamento$.list;
    console.log(this.departamento$.list);
    this.refArea = this._area.getList();
    this.refDepartamento = this.departamento$.getList();

  }

  ngOnInit() {
    this.subs.push(
      this.refDepartamento
        .subscribe(deps => this.departamentos = deps)
    );
    this.subs.push(
      this.refArea.subscribe(areas => this.areas = areas)
    );
    this.createForm();
  }

  ngOnDestroy() {
    this._area.list = [];
    this.departamento$.list = [];
    this._doc_ar.list = [];
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
        docente_departamento: new FormControl('0', [Validators.required])

      });
    } else {
      this.form = this.fb.group({
        docente_id: this.data.doc.docente_id,
        docente_nombre: new FormControl(this.data.doc.docente_nombre, [Validators.required, Validators.maxLength(100)]),
        docente_inss: new FormControl(this.data.doc.docente_inss, [Validators.required, Validators.min(10000)]),
        docente_tipo_contrato: new FormControl(this.data.doc.docente_tipo_contrato, [Validators.required]),
        docente_departamento: new FormControl(this.data.doc.docente_departamento, [Validators.required])

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
    this._doc_ar.client.put(`${this._doc_ar.getUrl()}docente_id=${docenteID}`, body)
      .subscribe(
        res => this.dialogRef.close(),
        error => this._snack.open(error.message, 'OK', { duration: 3000 }),
      );
  }

  add_area(areas) {
    this.areasSelecteds = areas._value;
  }

  onDocente(id: string) {
    if (this.data.doc != null) {
      let area = new DocenteAreaModel();
      area = this.doc_areas.find(do_ar => do_ar.da_area === id);
      // console.log("llamado por area: ",id, "\n",area,"\n",area.da_docente, this.data.doc.docente_id)
      if (area) {

        if (area.da_docente === this.data.doc.docente_id) {
          return true;
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  }

  get Form() {
    // console.log(this.form.controls);
    return this.form.controls;
  }



}
