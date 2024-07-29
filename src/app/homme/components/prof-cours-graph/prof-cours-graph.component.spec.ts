import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfCoursGraphComponent } from './prof-cours-graph.component';

describe('ProfCoursGraphComponent', () => {
  let component: ProfCoursGraphComponent;
  let fixture: ComponentFixture<ProfCoursGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfCoursGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfCoursGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
