import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthService } from '../auth.service'
import { Observable, of } from 'rxjs'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  username: string;
  isLoggedOn: boolean;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.getUsername().subscribe(res => {
      if(res){
        this.username = res;
        this.isLoggedOn = true;
      }
    });
  }

  logout(){
    this.authService.logout();
    this.isLoggedOn = false;
  }

}
