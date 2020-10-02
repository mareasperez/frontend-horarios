import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  constructor(private ngtitle: Title) { }
  setTitle(titulo: string) {
    this.ngtitle.setTitle(titulo + ' · ' + environment.APP_name );
  }
}
