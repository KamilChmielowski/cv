import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from '../../../environments/environment';
import { githubLanguagesMock } from './github.mock';
import { GithubService } from './github.service';

describe('GithubService', () => {
  let service: GithubService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(GithubService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  const getFetchLanguagesRequest = (): TestRequest => {
    return httpTestingController.expectOne(
      environment.github.apiUrl + environment.github.languagesEndpoint.replace('{project}', 'cv')
    );
  }

  const fetchLanguages = (): TestRequest => {
    service.getProjectLanguages('cv').subscribe(languages => {
      expect(languages).withContext('No data returned').toBeTruthy();
    });
    return getFetchLanguagesRequest();
  }

  it('should be created', () => expect(service).toBeTruthy());

  it('getProjectLanguages should retrieve data', () => {
    const req = fetchLanguages();

    expect(req.request.method).withContext('Unexpected HTTP method').toEqual('GET');

    req.flush(githubLanguagesMock);
  });

  it('getProjectLanguages should catch error and complete immediately', () => {
    let nextEmitted = false;
    service.getProjectLanguages('cv').subscribe({
      next: () => nextEmitted = true,
      complete: () => expect(nextEmitted).toBeFalse()
    });
    const req = getFetchLanguagesRequest();
    req.flush('Request failed', { status: 500, statusText: 'Internal Server Error.' });
  });
});
