import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesseurAddEditComponent } from './professeur-add-edit.component';

describe('ProfesseurAddEditComponent', () => {
  let component: ProfesseurAddEditComponent;
  let fixture: ComponentFixture<ProfesseurAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesseurAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfesseurAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
