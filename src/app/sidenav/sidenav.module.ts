import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SidenavComponent } from './sidenav.component';
import { SublevelMenuComponent } from './sublevel-menu.component';
import { StoreModule } from '@ngrx/store';
import { sideNavReduce } from './store/reduces';

@NgModule({
  declarations: [SidenavComponent, SublevelMenuComponent],
  imports: [SharedModule, StoreModule.forFeature('sidenav', sideNavReduce)],
  exports: [SidenavComponent, SublevelMenuComponent],
})
export class SidenavModule {}
