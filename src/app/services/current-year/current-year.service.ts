import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, map, Observable, of } from 'rxjs';

import { CurrentYearResponse } from './current-year.model';

@Injectable({ providedIn: 'root' })
export class CurrentYearService {
  constructor(private httpClient: HttpClient) {}

  getCurrentYear(): Observable<number> {
    return this.httpClient.get<CurrentYearResponse>(`https://world-clock.p.rapidapi.com/json/utc/now`, {
      headers: {
        'X-RapidAPI-Key': '5342b1c5bbmshed6f38ea124fc16p1bb353jsnfa4eb77a9c57',
        'X-RapidAPI-Host': 'world-clock.p.rapidapi.com',
      }
    }).pipe(
      catchError(() => of({ currentDateTime: new Date() })),
      map(response => new Date(response.currentDateTime).getFullYear()),
    );
  }
}
