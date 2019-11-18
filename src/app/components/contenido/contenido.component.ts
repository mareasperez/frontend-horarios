import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.css']
})
export class ContenidoComponent implements OnInit {
  @Output() public cerrar = new EventEmitter<boolean>();
  constructor(private router: Router) { }

  ngOnInit() {
  }
  close() {
    this.cerrar.emit(true);
  }
}
