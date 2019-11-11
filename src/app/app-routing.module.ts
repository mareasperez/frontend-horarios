import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerfacultComponent } from './components/facultad/verfacult/verfacult.component';
import { AddfacultComponent } from './components/facultad/addfacult/addfacult.component';
import { AddrecintoComponent } from './components/recinto/addrecinto/addrecinto.component';
import { VerrecintoComponent } from './components/recinto/verrecinto/verrecinto.component';
import { VerdepartamentoComponent } from './components/departamento/verdepartamento/verdepartamento.component';
import { AdddepartamentoComponent } from './components/departamento/adddepartamento/adddepartamento.component';
import { LoginComponent } from './components/login/login.component';
import { VeraulaComponent } from './components/aula/veraula/veraula.component';
import { AddaulaComponent } from './components/aula/addaula/addaula.component';
import { VerareaComponent } from './components/area/verarea/verarea.component';
import { AddareaComponent } from './components/area/addarea/addarea.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { VerdocenteComponent } from './components/docente/verdocente/verdocente.component';
import { AdddocenteComponent } from './components/docente/adddocente/adddocente.component';
import { VerplanestudioComponent } from './components/planestudio/verplanestudio/verplanestudio.component';
import { AddplanestudioComponent } from './components/planestudio/addplanestudio/addplanestudio.component';
import { HorariosComponent } from './components/reportes/horarios/horarios.component';
import { HomeComponent } from './components/home/home.component';
import { CargaComponent } from './components/reportes/carga/carga.component';
import { VercarreraComponent } from './components/carrera/vercarrera/vercarrera.component';
import { HorariosAnyoComponent } from './components/reportes/horarios-anyo/horarios-anyo.component';
import { DocHorasComponent } from './components/doc-horas/doc-horas.component';
import { CargaDocenciaComponent } from './components/reportes/carga-docencia/carga-docencia.component';
import { CargaComponentesComponent } from './components/reportes/carga-componentes/carga-componentes.component';
import { CrearGrupoComponent } from './components/crear-grupo/crear-grupo.component';
import { ComponentesListComponent } from './components/componentes/componentes-list/componentes-list.component';
import { CargasComponent } from './components/reportes/cargas/cargas.component';


const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  {
    path: 'reporte/carga',
    component: CargaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reporte/cargas',
    component: CargasComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reporte/cargas/planta',
    component: CargasComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reporte/cargas/horaria',
    component: CargasComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reporte/cargas/docencia',
    component: CargaDocenciaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reporte/cargas/componentes',
    component: CargaComponentesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reporte/horarios',
    component: HorariosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reporte/horarios/anyo',
    component: HorariosAnyoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'componente',
    component: ComponentesListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'facultad/list',
    component: VerfacultComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'facultad/add',
    component: AddfacultComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'recinto/add',
    component: AddrecintoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'recinto/ver',
    component: VerrecintoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'aula/ver',
    component: VeraulaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'aula/add',
    component: AddaulaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'departamento/add',
    component: AdddepartamentoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'departamento/ver',
    component: VerdepartamentoComponent,
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'login',
  //   component: LoginComponent,
  //   pathMatch: 'full'
  // },
  {
    path: 'area/ver',
    component: VerareaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'area/add',
    component: AddareaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'area/edit/:id',
    component: AddareaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'docente/ver',
    component: VerdocenteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'docente/add',
    component: AdddocenteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'docente/edit/:id',
    component: AdddocenteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'planestudio/ver',
    component: VerplanestudioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'planestudio/add',
    component: AddplanestudioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'planestudio/edit/:id',
    component: AddplanestudioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'grupos',
    component: CrearGrupoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'doc-horas',
    component: DocHorasComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'carrera/list',
    component: VercarreraComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
