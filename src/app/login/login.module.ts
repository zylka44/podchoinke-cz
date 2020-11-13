import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [LoginPageComponent, CardComponent],
  imports: [CommonModule, LoginRoutingModule],
  providers: [AngularFirestore],
})
export class LoginModule {}
