import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PruebaComponent } from './prueba/prueba.component';
import { Prueba2Component } from './prueba2/prueba2.component';
import { VerfacultComponent } from './verfacult/verfacult.component';
import { AddfacultComponent } from './addfacult/addfacult.component';
import { AddrecintoComponent } from './addrecinto/addrecinto.component';
import { VerrecintoComponent } from './verrecinto/verrecinto.component';
import { DelrecintoComponent } from './delrecinto/delrecinto.component';

const routes: Routes = [
  {
    path: 'prueba',
    component: PruebaComponent
  },
  {
    path: 'prueba2',
    component: Prueba2Component
  },
  {
    path: 'verfacult',
    component: VerfacultComponent
  },
  {
    path: 'addfacult',
    component: AddfacultComponent
  },
  {
    path: 'addrecinto',
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
