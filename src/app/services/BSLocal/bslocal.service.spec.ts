import { TestBed } from '@angular/core/testing';

import { BSLocalService } from './bslocal.service';

describe('BSLocalService', () => {
  let service: BSLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BSLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
