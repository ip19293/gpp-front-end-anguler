import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { FilterComponent } from './filter/filter.component';
import { StoreModule } from '@ngrx/store';
import { filterReducer } from './store/filter.reducer';

@NgModule({
  declarations: [FilterComponent],
  imports: [
    SharedModule /* , StoreModule.forFeature('filter', filterReducer) */,
  ],
  exports: [FilterComponent],
})
export class FilterModule {}
