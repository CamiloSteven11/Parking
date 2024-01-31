import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroIngresoComponent } from './components/ingreso/registro-ingreso/registro-ingreso.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'ingreso',
    loadChildren: () => import('./components/ingreso/ingreso.module').then(m => m.IngresoModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]
  },
  {
    path: 'salida',
    loadChildren: () => import('./components/salida/salida.module').then(m => m.SalidaModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]
  },
  {
    path: 'consulta',
    loadChildren: () => import('./components/consulta/consulta.module').then(m => m.ConsultaModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]
  },
  { path: 'inicio', component: InicioComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'inicio' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
