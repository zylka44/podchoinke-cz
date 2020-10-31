import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPageRoutingModule } from './user-page-routing.module';
import { UserPageComponent } from './containers/user-page/user-page.component';
import { LetterComponent } from './components/letter/letter.component';


@NgModule({
  declarations: [UserPageComponent, LetterComponent],
  imports: [
    CommonModule,
    UserPageRoutingModule
  ]
})
export class UserPageModule { }
