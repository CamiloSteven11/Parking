import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultaRoutingModule } from './consulta-routing.module';
import { ConsultaComponent } from './consulta/consulta.component';
import { MatTableModule } from '@angular/material/table'
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ConsultaComponent
  ],
  imports: [CommonModule, ConsultaRoutingModule, MatTableModule, SharedModule],

})
export class ConsultaModule { }
