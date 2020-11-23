import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';
import { JWTtokenGetter } from './token.getter';

/* imports de componentes */

import { NavbarComponent } from './components/navbar/navbar.component';
import { ContenidoComponent } from './components/contenido/contenido.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ComponentesComponent } from './components/grupo/componente-lista/componentes.component';
import { GrupoComponent } from './components/grupo/list-grupo/grupo.component';
import { DocHorasComponent } from './components/doc-horas/doc-horas-list/doc-horas.component';
import { CrearGrupoComponent } from './components/grupo/main-grupo/crear-grupo.component';
import { LogHorarioComponent } from './components/horarios/log-horario/log-horario.component';

/*  componentes de agregado */

import { AddfacultComponent } from './components/facultad/addfacult/addfacult.component';
import { AddrecintoComponent } from './components/recinto/addrecinto/addrecinto.component';
import { AdddepartamentoComponent } from './components/departamento/adddepartamento/adddepartamento.component';
import { AddaulaComponent } from './components/aula/addaula/addaula.component';
import { AddareaComponent } from './components/area/addarea/addarea.component';
import { AdddocenteComponent } from './components/docente/adddocente/adddocente.component';
import { AddplanestudioComponent } from './components/planestudio/addplanestudio/addplanestudio.component';
import { AddcarreraComponent } from './components/carrera/addcarrera/addcarrera.component';
import { AddPlanificacionComponent } from './components/planificacion/add-planificacion/add-planificacion.component';
import { DocHorasAddComponent } from './components/doc-horas/doc-horas-add/doc-horas-add.component';
import { AddComponenteComponent } from './components/componentes/add-componente/add-componente.component';
import { AddGrupoComponent } from './components/grupo/add-grupo/add-grupo.component';
import { AddHorarioComponent } from './components/horarios/add-horario/add-horario.component';

/* componentes de listado */

import { VerfacultComponent } from './components/facultad/verfacult/verfacult.component';
import { VerrecintoComponent } from './components/recinto/verrecinto/verrecinto.component';
import { VerdepartamentoComponent } from './components/departamento/verdepartamento/verdepartamento.component';
import { VeraulaComponent } from './components/aula/veraula/veraula.component';
import { VerareaComponent } from './components/area/verarea/verarea.component';
import { VerdocenteComponent } from './components/docente/verdocente/verdocente.component';
import { VerplanestudioComponent } from './components/planestudio/verplanestudio/verplanestudio.component';
import { VercarreraComponent } from './components/carrera/vercarrera/vercarrera.component';
import { ComponentesListComponent } from './components/componentes/componentes-list/componentes-list.component';
import { PlanificacionComponent } from 'src/app/components/planificacion/list-planificacion/planificacion.component';


/* Componentes de Reportes */

import { CargaComponentesComponent } from './components/reportes/carga-componentes/carga-componentes.component';
import { GridHorarioComponent } from './components/reportes/horarios/grid-horario/grid-horario.component';
import { CargasComponent } from './components/reportes/cargas/cargas.component';
import { HorariosAnyoComponent } from './components/reportes/horarios/horarios-anyo/horarios-anyo.component';
import { CargaDocenciaComponent } from './components/reportes/carga-docencia/carga-docencia.component';
import { HorarioDocenteComponent } from './components/reportes/horarios/horario-docente/horario-docente.component';
import { HorarioAulaComponent } from './components/reportes/horarios/horario-aula/horario-aula.component';

/* Servicios */

import { MainService } from './services/main.service';
import { FacultadSerivice } from './services/facultad.service';
import { DocenteService } from './services/docente.service';
import { AuthGuardService } from './services/auth-guard.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { RecintoService } from './services/recinto.service';
import { PlanificacionService } from './services/planificacion.service';
import { HorarioService } from './services/horario.service';
import { JwtService } from './services/jwt.service';
import { PensumService } from './services/pensum.service';
import { WsService } from './services/ws.service';
import { AreaService } from './services/area.service';
import { AulaService } from './services/aula.service';
import { ComponenteService } from './services/componente.service';
import { DepartamentoService } from './services/departamento.service';
import { DocenteHorasService } from './services/docente-horas.service';
import { DocenteAreaService } from './services/docente-area.service';
import { GrupoService } from './services/grupo.service';
import { CarreraService } from './services/carrera.service';

/* PIPES */


import { FacultadesPipe } from './pipes/facultades.pipe';
import { DepartamentoNamePipe } from './pipes/departamento-name.pipe';
import { DocenteNamePipe } from './pipes/docente-name.pipe';
import { CarreraNamePipe } from './pipes/carrera-name.pipe';
import { IncrementarPipe } from './pipes/incrementar.pipe';
import { ComponenteNombrePipe } from './pipes/componente-nombre.pipe';
import { AreaNamePipe } from './pipes/area-name.pipe';
import { AulaTipoPipe } from './pipes/aula-tipo.pipe';
import { DocenteGruposComponent } from './components/docente-grupos/docente-grupos.component';
import { ComponenteGrupoPipe } from './pipes/componente-grupo.pipe';
import { NombreGrupoPipe } from './pipes/nombre-grupo.pipe';
import { HorariosCrudComponent } from './components/horarios/horarios-main/horarios.component';
import { RecintoNombrePipe } from './pipes/recinto-nombre.pipe';
import { ComponenteNameSimplePipe } from './pipes/componente-name-simple.pipe';
import { ComponenteGrupoSimplePipe } from './pipes/componente-grupo-simple.pipe';
import { PlanNamePipe } from './pipes/plan-name.pipe';
import { DocAreasPipe } from './pipes/doc-areas.pipe';
import { PlanificacionPipePipe } from './pipes/planificacion-pipe.pipe';
import { AulaNamePipe } from './pipes/aula-name.pipe';
import { DocenteByGrupoPipe } from './pipes/docente-by-grupo.pipe';
import { GpComponenteNoDataPipe } from './pipes/gp-componente-no-data.pipe';
import { GpDocentePipe } from './pipes/gp-docente.pipe';
import { CompPdeCarreraPipe } from './pipes/comp--pde--carrera.pipe';
import { CicloToYearPipe } from './pipes/ciclo-to-year.pipe';
import { GpRecintoPipe } from './pipes/gp-recinto.pipe';
import { SumaGruposDocentePipe } from './pipes/suma-grupos-docente.pipe';
import { RedirIfFailPipe } from './pipes/redir-if-fail.pipe';

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
    PlanificacionComponent,
    LoginComponent,
    VeraulaComponent,
    AddaulaComponent,
    VerareaComponent,
    AddareaComponent,
    VerdocenteComponent,
    AdddocenteComponent,
    AddplanestudioComponent,
    VerplanestudioComponent,
    HomeComponent,
    ComponentesComponent,
    GrupoComponent,
    CargasComponent,
    AddcarreraComponent,
    VercarreraComponent,
    AddPlanificacionComponent,
    HorariosAnyoComponent,
    DocHorasComponent,
    DocHorasAddComponent,
    CargaDocenciaComponent,
    FacultadesPipe,
    DepartamentoNamePipe,
    DocenteNamePipe,
    CargaComponentesComponent,
    CarreraNamePipe,
    IncrementarPipe,
    CrearGrupoComponent,
    ComponenteNombrePipe,
    ComponentesListComponent,
    AddComponenteComponent,
    AreaNamePipe,
    AulaTipoPipe,
    AddGrupoComponent,
    DocenteGruposComponent,
    ComponenteGrupoPipe,
    NombreGrupoPipe,
    AddHorarioComponent,
    HorariosCrudComponent,
    RecintoNombrePipe,
    ComponenteNameSimplePipe,
    ComponenteGrupoSimplePipe,
    PlanNamePipe,
    DocAreasPipe,
    LogHorarioComponent,
    PlanificacionPipePipe,
    AulaNamePipe,
    DocenteByGrupoPipe,
    HorarioDocenteComponent,
    GpComponenteNoDataPipe,
    GpDocentePipe,
    HorarioAulaComponent,
    CompPdeCarreraPipe,
    CicloToYearPipe,
    GpRecintoPipe,
    SumaGruposDocentePipe,
    RedirIfFailPipe,
    GridHorarioComponent,
  ], entryComponents: [
    AddPlanificacionComponent,
    DocHorasAddComponent,
    AddcarreraComponent,
    AddComponenteComponent,
    AddGrupoComponent,
    AddHorarioComponent,
    LogHorarioComponent
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
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: JWTtokenGetter,
        whitelistedDomains: [environment.API_Domain],
        blacklistedRoutes: [environment.API_Auth, environment.Api_Auth_Verify],
      },
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [MainService,
    FacultadSerivice,
    DocenteService,
    AuthGuardService,
    RecintoService,
    PlanificacionService,
    HorarioService,
    JwtService,
    PensumService,
    WsService,
    AreaService,
    AulaService,
    ComponenteService,
    CarreraService,
    DepartamentoService,
    DocenteHorasService,
    DocenteAreaService,
    GrupoService,
    DocenteNamePipe,
    Title,
    CompPdeCarreraPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
