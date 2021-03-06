import { Component, OnInit, HostBinding, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { FacultadSerivice } from 'src/app/services/facultad.service';
import { FacultadModel } from 'src/app/models/facultad.model';
import { OverlayRef } from '@angular/cdk/overlay';
import { Subscription, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TitleService } from 'src/app/services/title.service';
@Component({
  selector: 'app-verfacult',
  templateUrl: './verfacult.component.html',
  styleUrls: ['./verfacult.component.css']
})
// tslint:disable: variable-name
export class VerfacultComponent implements OnInit, OnDestroy {
  @HostBinding('class') classes = 'row';
  public facultades: FacultadModel[] = [];
  public alerts = true;
  public isLoaded = false;
  public facultad: FacultadModel;
  public a: Observable<any[]>;
  @ViewChild('userMenu') userMenu: TemplateRef<any>;
  overlayRef: OverlayRef | null;
  sub: Subscription;
  subs: Subscription[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'opciones'];
  public dataSource = [];
  public hide = true;
  editing = false;
  promesa: Promise<any>;
  constructor(
    private facultadService: FacultadSerivice,
    private _snack: MatSnackBar,
    private _title: TitleService,
  ) {
    this._title.setTitle('Facultad');
    this.promesa = new Promise((resolve, reject) => {
      const sub = this.facultadService.getFacultad()
        .subscribe(res => {
          this.facultades.push(res);
          this.dataSource = this.facultades;

        },
          error => this._snack.open(error, 'OK', { duration: 3000 }),
          () => resolve()
        );
      this.subs.push(sub);
    });
    this.a = this.facultadService.getList();
  }

  ngOnInit() {
    this.promesa.then(() => {
      this.isLoaded = true;
      this.subs.push(this.a
        .subscribe(
          res => {
            this.dataSource = [];
            this.facultades = [];
            this.facultades = res;
            this.facultades.forEach(elemen => {
              this.dataSource.push(elemen);
            });
          },
          error => this._snack.open(error.error.detail, 'OK', { duration: 3000 }),
        )
      );
    });

  }

  ngOnDestroy() {
    this.facultadService.list = [];
    this.subs.map(sub => sub.unsubscribe());
  }



  deleteFaculta(id: string) {
    this.facultadService.deleteFacultad(id).subscribe(
      res => { console.log(res); },
      error => this._snack.open(error.error.detail, 'OK', { duration: 3000 }),
    );
  }


  filterAction(e: FacultadModel) {
    e.facultad_id === null ? this.saveFacultad(e) : this.updateFacultad(e);
  }

  saveFacultad(data: FacultadModel) {
    // console.log("s", data)
    const facultad = new FacultadModel();
    this.editing = true;
    facultad.facultad_nombre = data.facultad_nombre;
    facultad.facultad_id = null;
    this.facultadService.crearFacultad(facultad).subscribe(res => {
      this.editing = false;
    });
  }
  updateFacultad(data: FacultadModel) {
    console.log('u', data);

    const facultad = new FacultadModel();
    this.editing = true;
    facultad.facultad_nombre = data.facultad_nombre;
    this.facultadService.updateFacultad(facultad, data.facultad_id)
      .subscribe(
        res => { console.log('updated', res); },
        error => this._snack.open(error.error.detail, 'OK', { duration: 3000 }),
      );
  }

  showAdd(facd: FacultadModel | null) {
    if (!this.hide) {
      this.hide = true;
      this.facultad = facd;
      setTimeout(() => {
        this.hide = false;
      }, 150);
    } else {
      this.facultad = facd;
      this.hide = false;
    }
  }

  hideform(e) {
    this.hide = e;
  }
}
