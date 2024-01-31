import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngresoRoutingModule } from './ingreso-routing.module';
import { RegistroIngresoComponent } from './registro-ingreso/registro-ingreso.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    RegistroIngresoComponent
  ],
  imports: [
    CommonModule,
    IngresoRoutingModule,
    SharedModule
  ]
})
export class IngresoModule { }
