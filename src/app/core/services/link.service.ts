import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, throwError, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { AuthService } from '@app/core/services/auth.service';
import { Link } from '@app/core/models/link.model';
import { CoreModule } from '@app/core/core.module';

@Injectable({
  providedIn: CoreModule
})
export class LinksService {
  private storageKey = 'links';
  private data: BehaviorSubject<Link[]>;
  private version = 1;

  constructor(private http: HttpClient, private authService: AuthService) {
    // load data from storage
    let initialData: Link[];
    try {
      const storedData: Link[] = JSON.parse(
        localStorage.getItem(this.storageKey)
      );
      if (
        parseInt(localStorage.getItem(`${this.storageKey}.version`), 0) ===
        this.version
      ) {
        initialData = storedData;
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
    this.data = new BehaviorSubject<Link[]>(initialData);

    this.data.subscribe(data => {
      if (!!data) {
        localStorage.setItem(this.storageKey, JSON.stringify(data));
        localStorage.setItem(
          `${this.storageKey}.version`,
          this.version.toString()
        );
      } else {
        localStorage.removeItem(this.storageKey);
      }
    });

    this.authService.isLoggedIn.subscribe((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        const loadDataSubscription = this.loadData().subscribe(() =>
          loadDataSubscription.unsubscribe()
        );
      } else {
        this.data.next(null);
      }
    });
  }

  getData(): BehaviorSubject<Link[]> {
    return this.data;
  }

  loadData(): Observable<Link[] | HttpErrorResponse> {
    return this.http
      .get<Link[]>(environment.apiUrl + 'links', {
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          language: localStorage.getItem('usedLanguage') || 'de'
        }
      })
      .pipe(
        tap((data: Link[]) => this.data.next(data)),
        catchError(this.handleErrors)
      );
  }

  private handleErrors(
    error: HttpErrorResponse
  ): Observable<HttpErrorResponse> {
    console.log(JSON.stringify(error));
    return throwError(error);
  }
}
