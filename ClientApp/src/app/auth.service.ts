import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getUserNameUrl = '/Accounts';
  logoutUrl = '/Identity/Account/Logout';
  antiForgeryName = '__RequestVerificationToken';
  logoutAntiForgeryToken: string;

  constructor(
    private http: HttpClient
  ) { }
  getUsername(): Observable<string> {
    return  this.http.get<string>(this.getUserNameUrl).pipe(
      tap(_ => this.log("fetched username")),
      catchError(this.handleError<string>('getUsername'))
    );
  }

  logout(){
  // logout(): Observable<any>{
    this.http.get(this.logoutUrl, { responseType: 'text'}).pipe(
      tap(_ => this.log("get::logout token")),
      catchError(this.handleError<string>('get::logout'))
    ).subscribe(res => {
        let page = document.createElement('html');
        page.innerHTML = res.toString();
        let inputs = page.getElementsByTagName('input');
        if(inputs.length > 0){
          let token = this.logoutAntiForgeryToken = inputs[0].value;
          let formData = new FormData();
          formData.append(this.antiForgeryName, token);
          this.http.post(this.logoutUrl, formData).pipe(
            tap(_ => this.log("logged out")),
            catchError(this.handleError<string>('logout'))
          ).subscribe();
        }else{
          this.log(':: fail token ::' + res);
        }
    });
      
    // this.log('logout token is ' + this.logoutAntiForgeryToken);
    // this.http.post(this.logoutUrl, {__RequestVerificationToken: this.logoutAntiForgeryToken}).pipe(
    //   tap(_ => this.log("logged out")),
    //   catchError(this.handleError<string>('logout'))
    // ).subscribe();
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
