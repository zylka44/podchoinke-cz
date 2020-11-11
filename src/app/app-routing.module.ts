import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExtrasModule } from './extras/extras.module';
import { LoginModule } from './login/login.module';
import { UserPageModule } from './user-page/user-page.module';

const routes: Routes = [
  { path: 'login', loadChildren: () => LoginModule },
  {
    path: 'user',
    loadChildren: () => UserPageModule,
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', loadChildren: () => ExtrasModule },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
