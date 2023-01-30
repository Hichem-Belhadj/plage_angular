import { TestBed } from '@angular/core/testing';

import { DeconnexionGuard } from './deconnexion.guard';

describe('DeconnexionGuard', () => {
  let guard: DeconnexionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DeconnexionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
