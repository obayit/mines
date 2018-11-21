import { TestBed } from '@angular/core/testing';

import { MinesService } from './mines.service';

describe('MinesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MinesService = TestBed.get(MinesService);
    expect(service).toBeTruthy();
  });
});
