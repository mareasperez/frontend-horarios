import { Injectable } from '@angular/core';
import { Title} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  constructor(private ngtitle: Title) { }
  setTitle(titulo: string) {
    this.ngtitle.setTitle(titulo + ' · ' + 'Sistema de Planificacion');
  }
}
