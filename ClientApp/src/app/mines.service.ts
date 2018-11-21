import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Observable, of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators';

import { MinesInfo } from './MinesInfo'


@Injectable({
  providedIn: 'root'
})
export class MinesService {
  getMinesUrl = 'api/Mines/getMines';
  resetMinesUrl = 'api/Mines/resetMines';

  constructor(
    private http: HttpClient
  ) { }
  getMines(): Observable<MinesInfo> {
    return  this.http.get<MinesInfo>(this.getMinesUrl).pipe(
      tap(_ => this.log("fetched mines ")),
      catchError(this.handleError<MinesInfo>('getMines'))
    );
  }

  resetMines(): Observable<MinesInfo> {
    return  this.http.get<MinesInfo>(this.resetMinesUrl).pipe(
      tap(_ => this.log("fetched new mines ")),
      tap(res => console.log(res)),
      catchError(this.handleError<MinesInfo>('resetMines'))
    );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(`HeroService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
