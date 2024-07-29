import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploisFormComponent } from './emplois-form.component';

describe('EmploisFormComponent', () => {
  let component: EmploisFormComponent;
  let fixture: ComponentFixture<EmploisFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmploisFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmploisFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
