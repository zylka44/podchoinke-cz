import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPageRoutingModule } from './user-page-routing.module';
import { UserPageComponent } from './containers/user-page/user-page.component';
import { LetterComponent } from './components/letter/letter.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserPageCardComponent } from './components/user-page-card/user-page-card.component';
import { UserPageGiftComponent } from './components/user-page-gift/user-page-gift.component';

@NgModule({
  declarations: [UserPageComponent, LetterComponent, UserPageCardComponent, UserPageGiftComponent],
  imports: [CommonModule, UserPageRoutingModule],
  providers: [AngularFirestore],
})
export class UserPageModule {}
