import { Component, OnInit, Inject, OnDestroy } from "@angular/core";
import { GrupoModel } from "src/app/models/grupo.model";
import { FormControl, Validators, FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { matErrorsMessage } from "src/app/utils/errors";
import { Subscription } from "rxjs";
import { GrupoService } from "src/app/services/grupo.service";
// import { ComponenteService } from 'src/app/services/componente.service';
// import { DocenteService } from 'src/app/services/docente.service';
import { DocenteModel } from "src/app/models/docente.model";
import { ComponenteModel } from "src/app/models/componente.model";
import { PlanificacionModel } from "src/app/models/planificacion.model";
// import { PlanificacionService } from 'src/app/services/planificacion.service';
// import { Title } from '@angular/platform-browser';

interface DialogData {
  type: string;
  planificaciones: PlanificacionModel[];
  componentes: ComponenteModel[];
  docentes: DocenteModel[];
  grupo?: GrupoModel;
}

@Component({
  selector: "app-add-grupo",
  templateUrl: "./add-grupo.component.html",
  styleUrls: ["./add-grupo.component.scss"],
})
// tslint:disable: variable-name
export class AddGrupoComponent implements OnInit, OnDestroy {
  public Errors: matErrorsMessage = new matErrorsMessage();
  private subs: Subscription[] = [];
  public form: FormGroup;
  public grupos: GrupoModel[] = [];
  public docentes: DocenteModel[] = [];
  public componentes: ComponenteModel[] = [];
  public planificaciones: PlanificacionModel[] = [];
  public editing = false;
  public add = true;
  public show = false;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<AddGrupoComponent>,
    private _grupo: GrupoService,
    // private _comp: ComponenteService,
    // private _docente: DocenteService,
    // private _plan: PlanificacionService,
    private _snack: MatSnackBar
  ) {}

  ngOnInit() {
    this.planificaciones = this.data.planificaciones;
    this.docentes = this.data.docentes;
    this.componentes = this.data.componentes;
    this.createForm();
    this.show = true;
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  createForm(id?: string) {
    if (this.data.type === "c") {
      this.form = this.fb.group({
        grupo_id: null,
        grupo_numero: new FormControl("", [Validators.required, Validators.min(1)]),
        grupo_max_capacidad: new FormControl("40", [Validators.required, Validators.min(20)]),
        grupo_tipo: new FormControl("GT", [Validators.required, Validators.min(1)]),
        grupo_horas_clase: new FormControl("4", [Validators.required, Validators.min(1)]),
        grupo_modo: new FormControl("S", [Validators.required]),
        grupo_componente: new FormControl("", [Validators.required]),
        grupo_docente: new FormControl(""),
        grupo_planificacion: new FormControl("", [Validators.required]),
        grupo_planta: new FormControl(false, [Validators.required]),
      });
    } else {
      this.form = this.fb.group({
        grupo_id: this.data.grupo.grupo_id,
        grupo_numero: new FormControl(this.data.grupo.grupo_numero, [Validators.required, Validators.min(1)]),
        grupo_max_capacidad: new FormControl(this.data.grupo.grupo_max_capacidad, [
          Validators.required,
          Validators.min(20),
        ]),
        grupo_tipo: new FormControl(this.data.grupo.grupo_tipo, [Validators.required, Validators.min(1)]),
        grupo_horas_clase: new FormControl(this.data.grupo.grupo_horas_clase, [Validators.required, Validators.min(1)]),
        grupo_modo: new FormControl(this.data.grupo.grupo_modo, [Validators.required]),
        grupo_componente: new FormControl(this.data.grupo.grupo_componente, [Validators.required]),
        grupo_docente: new FormControl(this.data.grupo.grupo_docente),
        grupo_planificacion: new FormControl(this.data.grupo.grupo_planificacion, [Validators.required]),
        grupo_planta: new FormControl(this.data.grupo.grupo_planta, [Validators.required]),
      });
    }
  }

  saveGrupo(flag: number) {
    flag === 0 ? this.createGrupo() : this.editGrupo(this.form.value.grupo_id);
  }
  createGrupo() {
    this.editing = true;
    let grupo = new GrupoModel();
    grupo = Object.assign(grupo, this.form.value);
    console.log(grupo);
    this._grupo.crearGrupo(grupo).subscribe(
      (res) => {
        this.editing = false;
        this.add = false;
        this.dialogRef.close();
      },
      (error) => this._snack.open(error.error.detail, "OK", { duration: 3000 })
    );
  }

  editGrupo(id: number) {
    this.editing = true;
    let grupo = new GrupoModel();
    grupo = Object.assign(grupo, this.form.value);
    console.log(grupo);
    this._grupo.updategrupo(grupo, id).subscribe(
      (res) => {
        this.editing = false;
        this.add = false;
        this.dialogRef.close();
      },
      (error) => this._snack.open(error.error.detail, "OK", { duration: 3000 })
    );
  }

  get Form() {
    return this.form.controls;
  }
}
