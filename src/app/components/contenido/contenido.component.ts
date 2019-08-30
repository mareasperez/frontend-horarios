import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.css']
})
export class ContenidoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  go(rep: string) {
    this.router.navigate(['/reporte/horarios'], { queryParams: { reporte: rep } });
  }
}
