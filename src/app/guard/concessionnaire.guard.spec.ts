import { TestBed } from '@angular/core/testing';

import { ConcessionnaireGuard } from './concessionnaire.guard';

describe('ConcessionnaireGuard', () => {
  let guard: ConcessionnaireGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ConcessionnaireGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
