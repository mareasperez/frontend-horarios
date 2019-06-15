import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ContenidoComponent } from './contenido/contenido.component';
import { PruebaComponent } from './prueba/prueba.component';
import { Prueba2Component } from './prueba2/prueba2.component';
import { VerfacultComponent } from './verfacult/verfacult.component';
import { AddfacultComponent } from './addfacult/addfacult.component';
import { AddrecintoComponent } from './addrecinto/addrecinto.component';
import { VerrecintoComponent } from './verrecinto/verrecinto.component';
import { DelrecintoComponent } from './delrecinto/delrecinto.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ContenidoComponent,
    PruebaComponent,
    Prueba2Component,
    VerfacultComponent,
    AddfacultComponent,
    AddrecintoComponent,
    VerrecintoComponent,
    DelrecintoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
