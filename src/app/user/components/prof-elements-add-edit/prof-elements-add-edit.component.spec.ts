import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfElementsAddEditComponent } from './prof-elements-add-edit.component';

describe('ProfElementsAddEditComponent', () => {
  let component: ProfElementsAddEditComponent;
  let fixture: ComponentFixture<ProfElementsAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfElementsAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfElementsAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
