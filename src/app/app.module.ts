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
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { MainService } from './services/main.service';
import { FacultadSerivice } from './services/facultad-serivice';
import { HttpClientModule } from "@angular/common/http";
import { MaterialModule } from './material';
import {FormsModule} from '@angular/forms';

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
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MaterialModule,
    FormsModule
  ],
  providers: [MainService, FacultadSerivice],
  bootstrap: [AppComponent]
})
export class AppModule { }