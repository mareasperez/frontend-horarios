import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PruebaComponent } from './components/prueba/prueba.component';
import { Prueba2Component } from './components/prueba2/prueba2.component';
import { VerfacultComponent } from './components/verfacult/verfacult.component';
import { AddfacultComponent } from './components/addfacult/addfacult.component';
import { AddrecintoComponent } from './components/addrecinto/addrecinto.component';
import { VerrecintoComponent } from './components/verrecinto/verrecinto.component';
import { DelrecintoComponent } from './components/delrecinto/delrecinto.component';

const routes: Routes = [
  { path: '', redirectTo: '/facultad/add', pathMatch: 'full' },

  {
    path: 'prueba',
    component: PruebaComponent
  },
  {
    path: 'prueba2',
    component: Prueba2Component
  },
  {
    path: 'facultad/list',
    component: VerfacultComponent
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
    path: 'verrecinto',
    component: VerrecintoComponent
  },
  {
    path: 'delrecinto',
    component: DelrecintoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
