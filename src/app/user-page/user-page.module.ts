import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPageRoutingModule } from './user-page-routing.module';
import { UserPageComponent } from './containers/user-page/user-page.component';
import { LetterComponent } from './components/letter/letter.component';
import { AngularFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    UserPageComponent,
    LetterComponent
  ],
  imports: [ CommonModule, UserPageRoutingModule ],
  providers: [ AngularFirestore ],
})
export class UserPageModule {}
