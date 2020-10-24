import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExtrasRoutingModule } from './extras-routing.module';
import { NoSuchPageComponent } from './containers/no-such-page/no-such-page.component';


@NgModule({
  declarations: [NoSuchPageComponent],
  imports: [
    CommonModule,
    ExtrasRoutingModule
  ]
})
export class ExtrasModule { }
