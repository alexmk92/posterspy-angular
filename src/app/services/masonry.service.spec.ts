import { TestBed } from '@angular/core/testing';

import { MasonryService } from './masonry.service';

describe('MasonryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MasonryService = TestBed.get(MasonryService);
    expect(service).toBeTruthy();
  });
});
