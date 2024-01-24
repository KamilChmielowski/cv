import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, map, Observable, of } from 'rxjs';

import { CurrentYearResponse } from './current-year.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CurrentYearService {
  constructor(private httpClient: HttpClient) {}

  getCurrentYear(): Observable<number> {
    return this.httpClient.get<CurrentYearResponse>(environment.worldClockAPI.url, {
      headers: environment.worldClockAPI.headers
    }).pipe(
      catchError(() => of({ currentDateTime: new Date() })),
      map(response => {
        return (response?.currentDateTime ? new Date(response.currentDateTime) : new Date()).getFullYear();
      }),
    );
  }
}
