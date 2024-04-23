import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HommeComponent } from './homme/homme.component';

const routes: Routes = [{ path: 'homme', component: HommeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HommeRoutingModule {}
