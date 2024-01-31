import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalidaRoutingModule } from './salida-routing.module';
import { SalidaComponent } from './salida/salida.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    SalidaComponent
  ],
  imports: [
    CommonModule,
    SalidaRoutingModule,
    SharedModule
  ]
})
export class SalidaModule { }
