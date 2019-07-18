import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ContenidoComponent } from './components/contenido/contenido.component';
import { VerfacultComponent } from './components/facultad/verfacult/verfacult.component';
import { AddfacultComponent } from './components/facultad/addfacult/addfacult.component';
import { AddrecintoComponent } from './components/recinto/addrecinto/addrecinto.component';
import { VerrecintoComponent } from './components/recinto/verrecinto/verrecinto.component';
import { AdddepartamentoComponent } from './components/departamento/adddepartamento/adddepartamento.component';
import { VerdepartamentoComponent } from './components/departamento/verdepartamento/verdepartamento.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { MainService } from './services/main.service';
import { FacultadSerivice } from './services/facultad.service';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material';
import {FormsModule} from '@angular/forms';
import { DocenteService } from './services/docente.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ContenidoComponent,
    VerfacultComponent,
    AddfacultComponent,
    AddrecintoComponent,
    VerrecintoComponent,
    AdddepartamentoComponent,
    VerdepartamentoComponent,
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
  providers: [MainService, FacultadSerivice,DocenteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
