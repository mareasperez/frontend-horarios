import { Component, OnInit, HostBinding, ViewChild, ViewContainerRef, TemplateRef, OnDestroy } from '@angular/core';
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
export class VerfacultComponent implements OnInit, OnDestroy {
  @HostBinding('class') classes = 'row';
  public facultades: FacultadModel[] = [];
  public alerts = true;
  public facultad:FacultadModel;
  public a: Observable<any[]>;
  @ViewChild('userMenu', { static: false }) userMenu: TemplateRef<any>;
  overlayRef: OverlayRef | null;
  sub:Subscription
  subs: Subscription[]=[];
  public hide: boolean = true;
  editing = false;
  // tslint:disable-next-line: max-line-length
  constructor(private facultadService: FacultadSerivice,
             ) {
    this.subs.push(this.facultadService.getFacultad()
      .subscribe(res=>{
        this.facultades.push(res)
      })
    );
    this.a = this.facultadService.getList();
  }

  ngOnInit() {
    this.subs.push(this.a.subscribe(res=>{
      console.log(res)
      this.facultades = res;
    })
    );

  }

  ngOnDestroy(){
    this.facultadService.list = [];
    this.subs.map(sub=>sub.unsubscribe())
  }

  

  deleteFaculta(id: string) {
    this.facultadService.deleteFacultad(id).subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err)
    );
  }
  

  filterAction(e:FacultadModel) {
    console.log(e);
    if (e.facultad_id === null) {
      this.saveFacultad(e);
    } else {
      this.updateFacultad(e);
    }

  }

  saveFacultad(data:FacultadModel) {
    // console.log("s", data)
    const facultad = new FacultadModel();
    this.editing = true;
    facultad.facultad_nombre = data.facultad_nombre;
    facultad.facultad_id = null;
    this.facultadService.crearFacultad(facultad).subscribe(res => {
      this.editing = false;
    });
  }
  updateFacultad(data:FacultadModel) {
     console.log("u",data)

    const facultad = new FacultadModel();
    this.editing = true;
    facultad.facultad_nombre = data.facultad_nombre;
    this.facultadService.updateFacultad(facultad, data.facultad_id)
      .subscribe(
        res => {
          console.log("updated",res)

        },
        err => console.error(err)
      );
  }

  showAdd(facd: FacultadModel | null) {
    console.log('show add');
    this.facultad = facd;
    this.hide = false;
  }

  hideform(e) {
    this.hide = e;
  }
}
