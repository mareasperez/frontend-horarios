import { Component, OnInit, OnDestroy } from '@angular/core';
import { AreaService } from 'src/app/services/area.service';
import { AulaService } from 'src/app/services/aula.service';
import { CarreraService } from 'src/app/services/carrera.service';
import { ComponenteService } from 'src/app/services/componente.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  private subs:Subscription[]=[];
  constructor(private _area:AreaService,
              private _aula:AulaService,
              private _carrera:CarreraService,
              private _componente:ComponenteService


  ) { }

  ngOnInit() {
    this.subs.push(this._area.get().subscribe())
    this.subs.push(this._aula.get().subscribe())
    this.subs.push(this._carrera.get().subscribe())
    this.subs.push(this._componente.get().subscribe())
  }

  ngOnDestroy(){
    this.subs.map(sub=>{
      sub.unsubscribe()
    })
  }

}
