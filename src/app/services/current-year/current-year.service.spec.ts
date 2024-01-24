import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CurrentYearService } from './current-year.service';
import { environment } from '../../../environments/environment';

describe('CurrentYearService', () => {
  let service: CurrentYearService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CurrentYearService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  const fetchData = (): TestRequest => {
    service.getCurrentYear().subscribe(date => {
      expect(date).withContext('No data returned').toBeTruthy();
      expect(Number.isInteger(date)).withContext('Date must be integer').toBeTrue();
    });
    return httpTestingController.expectOne(environment.worldClockAPI.url);
  }

  it('getCurrentYear should retrieve date', () => {
    const req = fetchData();

    expect(req.request.method).withContext('Unexpected HTTP method').toEqual('GET');

    Object.entries(environment.worldClockAPI.headers).forEach(([key, value]) => {
      expect(req.request.headers.get(key)).withContext(`Missing ${key} header`).toEqual(value);
    });

    req.flush({ currentDateTime: new Date() });
  });

  it('getCurrentYear should catch error and retrieve fallback data', () => {
    const req = fetchData();

    req.flush('Request failed', { status: 500, statusText: 'Internal Server Error.' });
  });

  it('getCurrentYear should retrieve fallback data if API response will change', () => {
    const req = fetchData();

    req.flush({ currentDateTime2: new Date() });
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
