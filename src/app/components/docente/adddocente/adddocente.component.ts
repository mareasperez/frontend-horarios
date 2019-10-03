import { Component, OnInit, HostBinding, Inject, OnDestroy } from '@angular/core';
import { DocenteModel } from 'src/app/models/docente.model';
import { DocenteService } from 'src/app/services/docente.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { DepartamentoModel } from 'src/app/models/departamento.model';
import { Observable, Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AreaService } from 'src/app/services/area.service';
import { AreaModel } from 'src/app/models/area.model';
import { DocenteAreaService } from 'src/app/services/docente-area.service';
import { DocenteAreaModel } from 'src/app/models/docente.area.model';

interface DialogData {
  type: string;
  doc: DocenteModel;
}
@Component({
  selector: 'app-adddocente',
  templateUrl: './adddocente.component.html',
  styleUrls: ['./adddocente.component.scss']
})
export class AdddocenteComponent implements OnInit, OnDestroy {
  @HostBinding('class') classes = 'row';

  docente = new DocenteModel();
  public departamentos: DepartamentoModel[] = [];
  public areas:AreaModel[]=[]
  public areasSelecteds:string[]=[]

  private doc_areas:DocenteAreaModel[]=[]
  edit = false;
  subs: Subscription[] = [];
  public form: FormGroup;
  public refDepartamento: Observable<any>;
  public refArea: Observable<any>;

  constructor(private docenteService: DocenteService,
              private departamento$: DepartamentoService,
              private _area:AreaService,
              private _doc_ar:DocenteAreaService,
              public dialogRef: MatDialogRef<AdddocenteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private fb: FormBuilder
   ) {
     this._area.getAreas().subscribe(res => this.areas.push(res))
     this.departamento$.getDepartamento().subscribe(res => this.departamentos.push(res));
     this._doc_ar.getDcArea().subscribe(res => this.doc_areas.push(res))
     this.refArea = this._area.getList();
     this.refDepartamento = this.departamento$.getList();
   }

  ngOnInit() {
   this.subs.push(
      this.refDepartamento.subscribe(deps => this.departamentos = deps)
    );
    this.subs.push(
      this.refArea.subscribe(areas=> this.areas = areas)
    );
   this.createForm();
  }

  ngOnDestroy() {
    this._area.list = []
    this.departamento$.list = []
    this._doc_ar.list = []
    //this.docenteService.list = []
    this.subs.map(sub => sub.unsubscribe());
  }

  createForm( id?: string) {
    if (this.data.type === 'c') {
    this.form = this.fb.group({
      docente_id: null,
      docente_nombre: new FormControl('', [Validators.required]),
      docente_inss: new FormControl('', [Validators.required]),
      docente_tipo_contrato: new FormControl('', [Validators.required]),
      docente_departamento: new FormControl('', [Validators.required])

     });
    } else {
      this.form = this.fb.group({
        docente_id: this.data.doc.docente_id,
        docente_nombre: new FormControl(this.data.doc.docente_nombre, [Validators.required]),
        docente_inss: new FormControl(this.data.doc.docente_inss, [Validators.required]),
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
        .subscribe(res => {
          console.log(res)
          this.post_areas(res.id)
        })
    );
    console.log(this.areasSelecteds)

  }
  updateDocente() {
    let doc = new DocenteModel();
    doc = Object.assign(doc, this.form.value);
    this.subs.push(
      this.docenteService.updateDocente(doc, doc.docente_id)
        .subscribe(res =>{
          console.log(res)
           this.post_areas(doc.docente_id)
          })
        );
    
  }

  post_areas(docenteID){
    this._doc_ar.crearDcArea(docenteID, this.areasSelecteds)
    .subscribe(res=>this.dialogRef.close())

  }

  add_area(areas){
    this.areasSelecteds = areas._value
  }

 onDocente(id){
  console.log(this.areas, this.doc_areas)
    if(this.data.doc != null){
      let area = this.doc_areas.find(do_ar => do_ar.da_area === id)
      console.log("llamado por area: ",id, "\n",area,"\n",area.da_docente, this.data.doc.docente_id)
      if(area.da_docente === this.data.doc.docente_id){
        console.log("true")
        return true
      }else{
        console.log("false")

        return false
      }
    }else{
      console.log("inicio false")

      return false
      
    }
  }

}
