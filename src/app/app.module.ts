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
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MainService } from './services/main.service';
import { FacultadSerivice } from './services/facultad.service';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material';
import { FormsModule } from '@angular/forms';
import { DocenteService } from './services/docente.service';
import { LoginComponent } from './components/login/login.component';
import { VeraulaComponent } from './components/aula/veraula/veraula.component';
import { AddaulaComponent } from './components/aula/addaula/addaula.component';
import { VerareaComponent } from './components/area/verarea/verarea.component';
import { AddareaComponent } from './components/area/addarea/addarea.component';
<<<<<<< HEAD
import { VerdocenteComponent } from './components/docente/verdocente/verdocente.component';
import { AdddocenteComponent } from './components/docente/adddocente/adddocente.component';
=======
import {AuthGuardService} from './services/auth-guard.service';
import { JwtModule } from '@auth0/angular-jwt';
>>>>>>> ad015a8d090429cf8db195d7e148ee78be7f3d08

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
    LoginComponent,
    VeraulaComponent,
    AddaulaComponent,
    VerareaComponent,
    AddareaComponent,
    VerdocenteComponent,
    AdddocenteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MaterialModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter() {
          // console.log(localStorage.getItem('access_token'));
          return localStorage.getItem('access_token');
        },
        whitelistedDomains: ['localhost:8000',
          'http://localhost:8000/api/facultad/'],
        blacklistedRoutes: ['http://localhost:3000/api/auth/']
      }
    })
  ],
  providers: [MainService, FacultadSerivice, DocenteService,AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
