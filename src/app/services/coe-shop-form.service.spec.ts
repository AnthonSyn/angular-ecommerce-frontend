import { TestBed } from '@angular/core/testing';

import { CoeShopFormService } from './coe-shop-form.service';

describe('CoeShopFormService', () => {
  let service: CoeShopFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoeShopFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
