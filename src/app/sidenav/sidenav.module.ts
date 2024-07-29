import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SidenavComponent } from './sidenav.component';
import { SublevelMenuComponent } from './sublevel-menu.component';

@NgModule({
  declarations: [SidenavComponent, SublevelMenuComponent],
  imports: [
    SharedModule /* StoreModule.forFeature('sidenav', sideNavReducer) */,
  ],
  exports: [SidenavComponent, SublevelMenuComponent],
})
export class SidenavModule {}
