import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { InfoText } from './info-text.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InfoTextsService {

  private storageKey = 'info';
  private data: BehaviorSubject<InfoText[]>;
  private structuredData: BehaviorSubject<any>;

  constructor(
    private http: HttpClient,
    ) {
    // load data from storage
    let initialData: InfoText[];
    try {
      const storedData: InfoText[] = JSON.parse(localStorage.getItem(this.storageKey));
      if (this.isDataValid(storedData)) {
        initialData = storedData;
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
    this.data = new BehaviorSubject<InfoText[]>(initialData);
    this.structuredData = new BehaviorSubject<any>(null);

    this.data.subscribe(data => {
      if (!!data) {
        this.structuredData.next(data.reduce(
          (structured: any, infoText: InfoText) => ({...structured, [infoText.key]: infoText.description}),
          {}
        ));
        localStorage.setItem(this.storageKey, JSON.stringify(data));
      } else {
        this.structuredData.next(null);
        localStorage.removeItem(this.storageKey);
      }
    });

    const loadDataSubscription = this.loadData().subscribe(() => loadDataSubscription.unsubscribe());
  }

  getData(): BehaviorSubject<InfoText[]> {
    return this.data;
  }

  getStructuredData(): BehaviorSubject<any> {
    return this.structuredData;
  }

  loadData(): Observable<InfoText[]|HttpErrorResponse> {
    return this.http.get<InfoText[]>(
      environment.apiUrl + 'info',
      { headers: {
        'Content-Type': 'application/json'
      } }
    )
    .pipe(
      tap((data: InfoText[]) => this.data.next(data)),
      catchError(this.handleErrors)
    );
  }

  private isDataValid(data: InfoText[]): boolean {
    return !!data
      && Array.isArray(data)
      && data.every((infoText: InfoText) => {
        return !!infoText
          && typeof infoText.key === 'string'
          && typeof infoText.description === 'string';
      });
  }

  private handleErrors(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    console.log(JSON.stringify(error));
    return throwError(error);
  }
}
