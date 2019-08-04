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
import {
  AuthGuardService as AuthGuard
} from './services/auth-guard.service';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  {
    path: 'facultad/list',
    component: VerfacultComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'facultad/add',
    component: AddfacultComponent
  },
  {
    path: 'facultad/edit/:id',
    component: AddfacultComponent
  },
  {
    path: 'recinto/add/:id',
    component: AddrecintoComponent
  },
  {
    path: 'recinto/edit/:id',
    component: AddrecintoComponent
  },
  {
    path: 'recinto/ver',
    component: VerrecintoComponent
  },
  {
    path: 'recinto/aula/ver',
    component: VeraulaComponent
  },
  {
    path: 'recinto/aula/add/:id',
    component: AddaulaComponent
  },
  {
    path: 'recinto/aula/edit/:id',
    component: AddaulaComponent
  },
  {
    path: 'departamento/add/:id',
    component: AdddepartamentoComponent
  },
  {
    path: 'departamento/edit/:id',
    component: AdddepartamentoComponent
  },
  {
    path: 'departamento/ver',
    component: VerdepartamentoComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'area/ver',
    component: VerareaComponent
  },
  {
    path: 'area/add',
    component: AddareaComponent
  },
  {
    path: 'area/edit/:id',
    component: AddareaComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
