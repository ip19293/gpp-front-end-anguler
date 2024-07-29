import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfEmploiComponent } from './prof-emploi.component';

describe('ProfEmploiComponent', () => {
  let component: ProfEmploiComponent;
  let fixture: ComponentFixture<ProfEmploiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfEmploiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfEmploiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
