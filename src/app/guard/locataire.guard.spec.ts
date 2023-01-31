import { TestBed } from '@angular/core/testing';

import { LocataireGuard } from './locataire.guard';

describe('LocataireGuard', () => {
  let guard: LocataireGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LocataireGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
