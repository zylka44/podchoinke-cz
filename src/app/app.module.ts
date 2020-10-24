import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from 'src/environments/environment';
import { ExtrasModule } from './extras/extras.module';
import { LoginModule } from './login/login.module';
import { UserPageModule } from './user-page/user-page.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    ExtrasModule,
    LoginModule,
    UserPageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
