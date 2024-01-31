import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroIngresoComponent } from './registro-ingreso/registro-ingreso.component';

const routes: Routes = [
  { path: 'registro', component: RegistroIngresoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngresoRoutingModule { }
