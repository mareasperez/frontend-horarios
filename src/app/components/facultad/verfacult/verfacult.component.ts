import { Component, OnInit, HostBinding, ViewChild, ViewContainerRef, TemplateRef } from '@angular/core';
import { FacultadSerivice } from 'src/app/services/facultad.service';
import { FacultadModel } from 'src/app/models/facultad.model';
import { Router } from '@angular/router';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { fromEvent, Subscription } from 'rxjs';
import { take, filter } from 'rxjs/operators';
import { JwtService } from 'src/app/services/jwt.service';
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
  @ViewChild('userMenu', {static: false}) userMenu: TemplateRef<any>;
  overlayRef: OverlayRef | null;
  sub: Subscription;
  // tslint:disable-next-line: max-line-length
  constructor(private facultaService: FacultadSerivice, private route: Router, public overlay: Overlay, public viewContainerRef: ViewContainerRef, private jwt: JwtService) {

    this.facultaService.getList().subscribe(console.log);
  }

  ngOnInit() {
    this.getfacultades();
    this.setsock();

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
  editarFacultad(facultad) {
    this.route.navigate([`/facultad/edit/${facultad.facultad_id}`]);
  }
  setsock() {
    this.socket = new WebSocket(`ws://localhost:8000/ws/?token=${this.jwt.Token}`);

    this.socket.onopen = () => {
      console.log('WebSockets connection created for Facultad');
    };

    this.socket.onmessage = (event) => {
      //  var data = JSON.parse(event.data);
      // console.log('data from socket:' + event.data);
      // this.getfacultades()
      const action = JSON.parse(event.data);
      if (action.event === 'New Facultad' || action.event === 'Delete Facultad' || action.event === 'Update Facultad' ) {
        this.getfacultades();
      }
      console.log('ws envia el evento: ', action);


    };

    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.onopen(null);
    }
  }
  getfacultades() {
    this.facultades = [];
    this.facultaService.getFacultad().subscribe(
      res => {
        this.facultades.push(res);
        this.alerts = false;
        //console.log(this.facultades);
      },
      err => {
        console.error(err);
      }
    );
  }
  deleteFaculta(id: string) {
    this.facultaService.deleteFacultad(id).subscribe(
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
}
