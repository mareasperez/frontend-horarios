import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { PlanEstudioModel } from 'src/app/models/planEstudio';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CarreraService } from 'src/app/services/carrera.service';
import { CarreraModel } from 'src/app/models/carrera.model';
import { Observable, Subscription } from 'rxjs';
import { PlanEstudioService } from 'src/app/services/plan-estudio.service';
import { matErrorsMessage } from 'src/app/utils/errors';
interface DialogData {
  type: string;
  plan?: PlanEstudioModel;
}
@Component({
  selector: 'app-addplanestudio',
  templateUrl: './addplanestudio.component.html',
  styleUrls: ['./addplanestudio.component.scss']
})
export class AddplanestudioComponent implements OnInit {
  public form: FormGroup;
  public carreras: CarreraModel[] = [];
  public refCarrera: Observable<any>;
  public selected = '0';
  subs: Subscription[] = [];
  public Errors: matErrorsMessage = new matErrorsMessage();
  // tslint:disable: variable-name
  constructor(
    private carrera$: CarreraService,
    private plan$: PlanEstudioService,
    public dialogRef: MatDialogRef<AddplanestudioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private _snack: MatSnackBar
  ) {
    const p1 = new Promise((resolve, reject) => {
      this.carrera$.getCarrera()
        .subscribe(
          res => this.carreras.push(res),
          error => this._snack.open(error.message, 'OK', { duration: 3000 }),
        );
    });

    this.refCarrera = this.carrera$.getList();
  }

  ngOnInit() {
    this.refCarrera.subscribe(data => {
      this.carreras = data;
    });

    this.createForm();

  }
  get Form() {
    return this.form.controls;
  }

  createForm(id?: string) {
    if (this.data.type === 'c') {
      this.form = this.fb.group({
        pde_id: null,
        pde_nombre: new FormControl('', [Validators.required, Validators.maxLength(150)]),
        pde_anyo: new FormControl('', [Validators.required, Validators.min(2008)]),
        pde_carrera: new FormControl('0', [Validators.required])

      });
    } else {
      console.log(this.data.plan);

      this.form = this.fb.group({
        pde_nombre: new FormControl(this.data.plan.pde_nombre, [Validators.required, Validators.maxLength(150)]),
        pde_anyo: new FormControl(this.data.plan.pde_anyo, [Validators.required, Validators.min(2008)]),
        pde_carrera: new FormControl(this.data.plan.pde_carrera, [Validators.required]),
        pde_id: new FormControl(this.data.plan.pde_id)

      });
    }
  }

  createPlan() {
    let plan = new PlanEstudioModel();
    plan = Object.assign(plan, this.form.value);
    this.subs.push(
      this.plan$.crearPlanEstudio(plan)
        .subscribe(
          res => this.dialogRef.close(),
          error => this._snack.open(error.message, 'OK', { duration: 3000 }),
        )
    );
  }

  updatePlan() {
    let plan = new PlanEstudioModel();
    plan = Object.assign(plan, this.form.value);
    this.subs.push(
      this.plan$.updatePlanEstudio(plan, plan.pde_id)
        .subscribe(
          res => this.dialogRef.close(),
          error => this._snack.open(error.message, 'OK', { duration: 3000 }),
        )
    );
  }
}
