import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ContenidoComponent } from './components/contenido/contenido.component';
import { PruebaComponent } from './components/prueba/prueba.component';
import { Prueba2Component } from './components/prueba2/prueba2.component';
import { VerfacultComponent } from './components/verfacult/verfacult.component';
import { AddfacultComponent } from './components/addfacult/addfacult.component';
import { AddrecintoComponent } from './components/addrecinto/addrecinto.component';
import { VerrecintoComponent } from './components/verrecinto/verrecinto.component';
import { DelrecintoComponent } from './components/delrecinto/delrecinto.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';

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
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }