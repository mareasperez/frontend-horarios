import { Component, OnInit, OnDestroy } from '@angular/core';
import { CarreraModel } from 'src/app/models/carrera.model';
import { Observable, Subscription } from 'rxjs';
import { CarreraService } from 'src/app/services/carrera.service';
import { MatDialog } from '@angular/material';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-vercarrera',
  templateUrl: './vercarrera.component.html',
  styleUrls: ['./vercarrera.component.scss']
})
export class VercarreraComponent implements OnInit, OnDestroy {
  public carreras: CarreraModel [] = [];
  public ref: Observable<any[]>;
  public refCarrera: Observable<any[]>;
  sub: Subscription;
  constructor( private carrera$: CarreraService,
               private dialog: MatDialog
    ) {
      this.carrera$.getCarrera().subscribe(res => this.carreras.push(res))
    }

  ngOnInit() {
  }
  ngOnDestroy() {
  }

}
