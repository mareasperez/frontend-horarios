import { Component, OnInit, OnDestroy } from '@angular/core';
import { AreaService } from 'src/app/services/area.service';
import { AreaModel } from 'src/app/models/area.model';
import { Observable, Subscription } from 'rxjs';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AddareaComponent } from '../addarea/addarea.component';

@Component({
  selector: 'app-verarea',
  templateUrl: './verarea.component.html',
  styleUrls: ['./verarea.component.scss']
})
// tslint:disable: no-shadowed-variable
// tslint:disable: variable-name
export class VerareaComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];
  public areas: AreaModel[] = [];
  promesas: Promise<any>[] = [];
  public activartabla: boolean;
  public refArea: Observable<any[]>;
  sub: Subscription;
  displayedColumns: string[] = ['id', 'nombre', 'opciones'];
  public dataSource = [];
  constructor(
    private _area: AreaService,
    private dialog: MatDialog,
    private _snack: MatSnackBar
  ) {
    const p = new Promise<void>((resolve) => {
      const sub = this._area.getAreas()
        .subscribe(
          res => {
            this.areas.push(res);
          },
          error => this._snack.open(error.message, 'OK', { duration: 3000 }),
          () => resolve()
        );
      this.subs.push(sub);
    });
    this.refArea = this._area.getList();
    this.promesas.push(p);
  }
  ngOnInit() {
    Promise.all(this.promesas).then(() => {
      this.dataSource = this.areas;
      this.activartabla = true;
      this.refArea.subscribe((data: AreaModel[]) => {
        this.areas = [];
        this.dataSource = [];
        this.areas = data;
        this.dataSource = this.areas;
      });
    });

  }

  ngOnDestroy() {
    this._area.list = [];
    if (this.sub !== undefined) {
      this.sub.unsubscribe();
    }
  }

  delArea(id) {
    this.sub = this._area.deleteArea(id)
      .subscribe(
        res => { },
        error => this._snack.open(error.message, 'OK', { duration: 3000 }),
      );
  }

  openDialog(tipo, nombre?, id?): void {
    if (tipo === 'c') {
      const dialogRef = this.dialog.open(AddareaComponent, {
        width: '450px',
        data: { type: tipo }
      });
    } else {
      const dialogRef = this.dialog.open(AddareaComponent, {
        width: '450px',
        data: { type: tipo, name: nombre, id: id }
      });
    }
  }
}
