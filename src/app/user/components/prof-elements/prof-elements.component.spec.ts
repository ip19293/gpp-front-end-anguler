import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfElementsComponent } from './prof-elements.component';

describe('ProfElementsComponent', () => {
  let component: ProfElementsComponent;
  let fixture: ComponentFixture<ProfElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfElementsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
