import { Injectable } from '@angular/core';

import { Observable, of, Subject } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators';
import * as signalR from '@aspnet/signalr';

export class ClickSignalData{
  x: number;
  y: number;
}
export class FlagSignalData{
  x: number;
  y: number;
  flag: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SignalrServiceService {
  private _hubConnection: signalR.HubConnection;
  clickSignalData = new Subject<ClickSignalData>();
  flagSignalData = new Subject<FlagSignalData>();
  restartGame = new Subject<string>();

  constructor() {
    this._hubConnection = new signalR.HubConnectionBuilder()
    .withUrl('gameHub').build();
    this._hubConnection
      .start()
      .then(() => console.log('Connection started!'))
      .catch(err => console.log('Error while establishing connection :('));

    this._hubConnection.on('Clicked', (x: number, y: number) => {
      this.clickSignalData.next({ x: x, y: y } as ClickSignalData);
      console.log(`signal: click ${x},${y}`)
    });
    this._hubConnection.on('Flagged', (x: number, y: number, flag: boolean) => {
      this.flagSignalData.next({ x: x, y: y, flag: flag} as FlagSignalData);
      console.log(`signal: flag ${x},${y} flag ${flag}`)
    });
    this._hubConnection.on('Restart', (notUsed: string) => {
      this.restartGame.next(notUsed);
      console.log(`signal: Restart`)
    });
   }

   OnClicked(x: number, y: number){
    this._hubConnection.send('Clicked', x, y);
   }
   OnFlagged(x: number, y: number, flag: boolean){
      this._hubConnection.send('Flagged', x, y, flag);
   }
   OnRestart(){
    this._hubConnection.send('Restart');
   }
}
