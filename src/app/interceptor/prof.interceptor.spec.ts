import { TestBed } from '@angular/core/testing';

import { ProfInterceptor } from './prof.interceptor';

describe('ProfInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ProfInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ProfInterceptor = TestBed.inject(ProfInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
