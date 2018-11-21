import { TestBed } from '@angular/core/testing';

import { SignalrServiceService } from './signalr-service.service';

describe('SignalrServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SignalrServiceService = TestBed.get(SignalrServiceService);
    expect(service).toBeTruthy();
  });
});
