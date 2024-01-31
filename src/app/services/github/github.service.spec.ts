import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from '../../../environments/environment';
import { githubCommitsMock, githubLanguagesMock } from './github.mock';
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
      expect(Object.values(languages).length).withContext('Min one lang required').toBeGreaterThanOrEqual(1);
    });
    return getFetchLanguagesRequest();
  }

  const getFetchCommitsRequest = (): TestRequest => {
    return httpTestingController.expectOne(
      environment.github.apiUrl + environment.github.commitsEndpoint.replace('{project}', 'cv')
    );
  }

  const fetchCommits = (): TestRequest => {
    service.getProjectCommits('cv').subscribe(commits => {
      expect(commits).withContext('No data returned').toBeTruthy();
      expect(Object.values(commits).length).withContext('Min one commit required').toBeGreaterThanOrEqual(1);
    });
    return getFetchCommitsRequest();
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

  it('getProjectCommits should retrieve data', () => {
    const req = fetchCommits();

    expect(req.request.method).withContext('Unexpected HTTP method').toEqual('GET');

    req.flush([githubCommitsMock]);
  });

  it('getProjectCommits should catch error and complete immediately', () => {
    let nextEmitted = false;
    service.getProjectCommits('cv').subscribe({
      next: () => nextEmitted = true,
      complete: () => expect(nextEmitted).toBeFalse()
    });
    const req = getFetchCommitsRequest();
    req.flush('Request failed', { status: 500, statusText: 'Internal Server Error.' });
  });
});
