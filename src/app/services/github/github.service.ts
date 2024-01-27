import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, EMPTY, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { GithubCommits, GithubLanguages } from './github.model';

@Injectable({ providedIn: 'root' })
export class GithubService {
  constructor(private httpClient: HttpClient) {}

  getProjectLanguages(project: string): Observable<GithubLanguages> {
    return this.httpClient.get<GithubLanguages>(
      environment.github.apiUrl + environment.github.languagesEndpoint.replace('{project}', project)
    ).pipe(catchError(() => EMPTY));
  }

  getProjectCommits(project: string): Observable<GithubCommits> {
    return this.httpClient.get<GithubCommits>(
      environment.github.apiUrl + environment.github.commitsEndpoint.replace('{project}', project)
    ).pipe(catchError(() => EMPTY));
  }
}
