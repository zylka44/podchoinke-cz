import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoSuchPageComponent } from './containers/no-such-page/no-such-page.component';

const routes: Routes = [
  { path: '', component: NoSuchPageComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExtrasRoutingModule {}
