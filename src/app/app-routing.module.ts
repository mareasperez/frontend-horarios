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
import {  AuthGuardService as AuthGuard} from './services/auth-guard.service';
import { VerdocenteComponent } from './components/docente/verdocente/verdocente.component';
import { AdddocenteComponent } from './components/docente/adddocente/adddocente.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

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
    path: 'facultad/edit/:id',
    component: AddfacultComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'recinto/add',
    component: AddrecintoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'recinto/edit/:id',
    component: AddrecintoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'recinto/ver',
    component: VerrecintoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'recinto/aula/ver',
    component: VeraulaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'recinto/aula/add',
    component: AddaulaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'recinto/aula/edit/:id',
    component: AddaulaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'departamento/add',
    component: AdddepartamentoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'departamento/edit/:id',
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
