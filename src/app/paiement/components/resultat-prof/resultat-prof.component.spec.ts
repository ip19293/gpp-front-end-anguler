import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatProfComponent } from './resultat-prof.component';

describe('ResultatProfComponent', () => {
  let component: ResultatProfComponent;
  let fixture: ComponentFixture<ResultatProfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultatProfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultatProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
