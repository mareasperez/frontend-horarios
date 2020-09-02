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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocenteService } from './services/docente.service';
import { LoginComponent } from './components/login/login.component';
import { VeraulaComponent } from './components/aula/veraula/veraula.component';
import { AddaulaComponent } from './components/aula/addaula/addaula.component';
import { VerareaComponent } from './components/area/verarea/verarea.component';
import { AddareaComponent } from './components/area/addarea/addarea.component';
import { VerdocenteComponent } from './components/docente/verdocente/verdocente.component';
import { AdddocenteComponent } from './components/docente/adddocente/adddocente.component';
import { AuthGuardService } from './services/auth-guard.service';
import { JwtModule } from '@auth0/angular-jwt';
import { AddplanestudioComponent } from './components/planestudio/addplanestudio/addplanestudio.component';
import { VerplanestudioComponent } from './components/planestudio/verplanestudio/verplanestudio.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { JWTtokenGetter } from './token.getter';
import { RecintoService } from './services/recinto.service';
import { PlanificacionService } from './services/planificacion.service';
import { HorarioService } from './services/horario.service';
import { JwtService } from './services/jwt.service';
import { PensumService } from './services/pensum.service';
import { WsService } from './services/ws.service';
import { AreaService } from './services/area.service';
import { AulaService } from './services/aula.service';
import { ComponenteService } from './services/componente.service';
import { CarreraService } from './services/carrera.service';
import { DepartamentoService } from './services/departamento.service';
import { DocenteHorasService } from './services/docente-horas.service';
import { DocenteAreaService } from './services/docente-area.service';
import { GrupoService } from './services/grupo.service';
import { HomeComponent } from './components/home/home.component';
import { ComponentesComponent } from './components/componentes/componentes.component';
import { GrupoComponent } from './components/grupo/grupo.component';
import { CargasComponent } from './components/reportes/cargas/cargas.component';
import { AddcarreraComponent } from './components/carrera/addcarrera/addcarrera.component';
import { VercarreraComponent } from './components/carrera/vercarrera/vercarrera.component';
import { PlanificacionComponent } from 'src/app/components/planificacion/planificacion.component';
import { AddPlanificacionComponent } from './components/planificacion/add-planificacion/add-planificacion.component';
import { HorariosAnyoComponent } from './components/reportes/horarios/horarios-anyo/horarios-anyo.component';
import { DocHorasComponent } from './components/doc-horas/doc-horas.component';
import { DocHorasAddComponent } from './components/doc-horas-add/doc-horas-add.component';
import { CargaDocenciaComponent } from './components/reportes/carga-docencia/carga-docencia.component';
import { FacultadesPipe } from './pipes/facultades.pipe';
import { DepartamentoNamePipe } from './pipes/departamento-name.pipe';
import { DocenteNamePipe } from './pipes/docente-name.pipe';
import { CargaComponentesComponent } from './components/reportes/carga-componentes/carga-componentes.component';
import { CarreraNamePipe } from './pipes/carrera-name.pipe';
import { IncrementarPipe } from './pipes/incrementar.pipe';
import { CrearGrupoComponent } from './components/crear-grupo/crear-grupo.component';
import { ComponenteNombrePipe } from './pipes/componente-nombre.pipe';
import { ComponentesListComponent } from './components/componentes/componentes-list/componentes-list.component';
import { AddComponenteComponent } from './components/componentes/add-componente/add-componente.component';
import { AreaNamePipe } from './pipes/area-name.pipe';
import { AulaTipoPipe } from './pipes/aula-tipo.pipe';
import { AddGrupoComponent } from './components/grupo/add-grupo/add-grupo.component';
import { DocenteGruposComponent } from './components/docente-grupos/docente-grupos.component';
import { ComponenteGrupoPipe } from './pipes/componente-grupo.pipe';
import { NombreGrupoPipe } from './pipes/nombre-grupo.pipe';
import { HorariosCrudComponent } from './components/horarios/horarios.component';
import { AddHorarioComponent } from './components/horarios/add-horario/add-horario.component';
import { RecintoNombrePipe } from './pipes/recinto-nombre.pipe';
import { ComponenteNameSimplePipe } from './pipes/componente-name-simple.pipe';
import { ComponenteGrupoSimplePipe } from './pipes/componente-grupo-simple.pipe';
import { PlanNamePipe } from './pipes/plan-name.pipe';
import { DocAreasPipe } from './pipes/doc-areas.pipe';
import { LogHorarioComponent } from './components/horarios/log-horario/log-horario.component';
import { PlanificacionPipePipe } from './pipes/planificacion-pipe.pipe';
import { AulaNamePipe } from './pipes/aula-name.pipe';
import { DocenteByGrupoPipe } from './pipes/docente-by-grupo.pipe';
import { HorarioDocenteComponent } from './components/reportes/horarios/horario-docente/horario-docente.component';
import { GpComponenteNoDataPipe } from './pipes/gp-componente-no-data.pipe';
import { HorarioAulaComponent } from './components/reportes/horarios/horario-aula/horario-aula.component';
import { CompPdeCarreraPipe } from './pipes/comp--pde--carrera.pipe';
import { CicloToYearPipe } from './pipes/ciclo-to-year.pipe';

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
    HorarioAulaComponent,
    CompPdeCarreraPipe,
    CicloToYearPipe,
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
        whitelistedDomains: ['localhost:8000', 'http://localhost:8000/api/facultad/',
          'localhost:4200', '192.168.10.9:8000'],
        blacklistedRoutes: ['http://localhost:3000/api/auth/'],
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
    DocenteNamePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
