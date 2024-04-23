import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiliereEmploiComponent } from './filiere-emploi.component';

describe('FiliereEmploiComponent', () => {
  let component: FiliereEmploiComponent;
  let fixture: ComponentFixture<FiliereEmploiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiliereEmploiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiliereEmploiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
