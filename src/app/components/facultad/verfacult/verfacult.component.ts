import { Component, OnInit, HostBinding, ViewChild, ViewContainerRef, TemplateRef } from '@angular/core';
import { FacultadSerivice } from 'src/app/services/facultad.service';
import { FacultadModel } from 'src/app/models/facultad.model';
import { Router } from '@angular/router';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { fromEvent, Subscription, Observable } from 'rxjs';
import { take, filter } from 'rxjs/operators';
@Component({
  selector: 'app-verfacult',
  templateUrl: './verfacult.component.html',
  styleUrls: ['./verfacult.component.css']
})
export class VerfacultComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  public facultades: FacultadModel[] = [];
  public alerts = true;
  socket: WebSocket;
  public facultad_id = 0;
  public a: Observable<any[]>;
  @ViewChild('userMenu', { static: false }) userMenu: TemplateRef<any>;
  overlayRef: OverlayRef | null;
  sub: Subscription;
  public hide = true;
  editing = false;
  // tslint:disable-next-line: max-line-length
  constructor(private facultadService: FacultadSerivice,
              public overlay: Overlay,
              public viewContainerRef: ViewContainerRef
  ) {
    this.facultadService.getFacultad().subscribe(res => {
      this.facultades.push(res);
    });
    this.a = this.facultadService.getList();
  }

  ngOnInit() {
    this.a.subscribe(res => {
      console.log(res);
      this.facultades = res;
    });

  }

  ngOnDestroy() {
    this.facultadService.list = [];
    if (this.sub !== undefined) {
      this.sub.unsubscribe();
    }
  }

  open({ x, y }: MouseEvent, facultad) {
    this.close();
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo({ x, y })
      .withPositions([
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
        }
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close()
    });

    this.overlayRef.attach(new TemplatePortal(this.userMenu, this.viewContainerRef, {
      $implicit: facultad
    }));

    this.sub = fromEvent<MouseEvent>(document, 'click')
      .pipe(
        filter(event => {
          const clickTarget = event.target as HTMLElement;
          return !!this.overlayRef && !this.overlayRef.overlayElement.contains(clickTarget);
        }),
        take(1)
      ).subscribe(() => this.close());

  }

  getfacultades() {
    this.facultades = [];
    this.facultadService.getFacultad().subscribe(
      res => {
        // console.log(res)
        this.facultades.push(res);
        this.alerts = false;
      },
      err => {
        console.error(err);
      }
    );
  }
  deleteFaculta(id: string) {
    this.facultadService.deleteFacultad(id).subscribe(
      res => {
        console.log(res);
        this.getfacultades();
      },
      err => console.log(err)
    );
  }
  close() {
    // tslint:disable-next-line: no-unused-expression
    this.sub && this.sub.unsubscribe();
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  filterAction(e) {
    console.log(e);
    if (e.id === 0) {
      this.saveFacultad(e.data);
    } else {
      this.updateFacultad(e);
    }

  }

  saveFacultad(data) {
    // console.log("s", data)
    const facultad = new FacultadModel();
    this.editing = true;
    facultad.facultad_nombre = data.nombre;
    facultad.facultad_id = null;
    this.facultadService.crearFacultad(facultad).subscribe(res => {
      this.editing = false;
    });
  }
  updateFacultad(data) {
    // console.log("u",data)

    const facultad = new FacultadModel();
    this.editing = true;
    facultad.facultad_nombre = data.data.nombre;
    this.facultadService.updateFacultad(facultad, data.id)
      .subscribe(
        res => {

        },
        err => console.error(err)
      );
  }

  showAdd(id?: number) {
    console.log('show add');
    this.facultad_id = id;
    this.hide = false;
  }

  hideform(e) {
    this.hide = e;
  }
}
