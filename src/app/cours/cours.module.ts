import { NgModule } from '@angular/core';
import { CoursComponent } from './components/cours/cours.component';
import { SharedModule } from '../shared/shared.module';
import { CoursRoutingModule } from './cours-routing.module';
import { NavbarModule } from '../navbar/navbar.module';
import { SidenavModule } from '../sidenav/sidenav.module';
import { CoursAddEditComponent } from './components/cours-add-edit/cours-add-edit.component';
import { EmploisComponent } from './components/emplois/emplois.component';
import { EmploisAddEditComponent } from './components/emplois-add-edit/emplois-add-edit.component';
import { EmploisFormComponent } from './components/emplois-form/emplois-form.component';

@NgModule({
  declarations: [
    CoursComponent,
    CoursAddEditComponent,
    EmploisComponent,
    EmploisAddEditComponent,
    EmploisFormComponent,
  ],
  imports: [SharedModule, CoursRoutingModule, NavbarModule, SidenavModule],
})
export class CoursModule {}
