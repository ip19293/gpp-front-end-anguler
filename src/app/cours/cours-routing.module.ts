import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursComponent } from './components/cours/cours.component';
import { EmploisComponent } from './components/emplois/emplois.component';

const routes: Routes = [
  { path: 'cours', component: CoursComponent },
  { path: 'emplois', component: EmploisComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursRoutingModule {}
