import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerfacultComponent } from './components/facultad/verfacult/verfacult.component';
import { AddfacultComponent } from './components/facultad/addfacult/addfacult.component';
import { AddrecintoComponent } from './components/recinto/addrecinto/addrecinto.component';
import { VerrecintoComponent } from './components/recinto/verrecinto/verrecinto.component';

const routes: Routes = [
  { path: '', redirectTo: '/facultad/add', pathMatch: 'full' },

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
