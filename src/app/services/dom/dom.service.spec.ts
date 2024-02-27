import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';

import { DomService } from './dom.service';

describe('DomService', () => {
  let service: DomService;
  const documentMock = {
    querySelectorAll: () => [],
    defaultView: {
      window: {
        matchMedia: (query: string) => ({ matches: query === '(min-width: 1024px)' })
      }
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: DOCUMENT, useValue: documentMock }]
    });
    service = TestBed.inject(DomService);
  });


  it('should validate desktop media breakpoint', () => {
    expect(service.isDesktop()).toBeTrue();
  });
});
