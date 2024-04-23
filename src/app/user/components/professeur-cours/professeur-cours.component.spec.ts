import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesseurCoursComponent } from './professeur-cours.component';

describe('ProfesseurCoursComponent', () => {
  let component: ProfesseurCoursComponent;
  let fixture: ComponentFixture<ProfesseurCoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesseurCoursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfesseurCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
