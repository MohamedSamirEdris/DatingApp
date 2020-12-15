import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';
// import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
    baseUrl = 'https://localhost:5001/api/';
    private currentUserSource = new ReplaySubject<User | null>(1);
    currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }


  login (model: any){
    return this.http.post<User>(this.baseUrl + 'account/login' , model).pipe(
      map((reponse: User) => {
        const user = reponse;
        if (user) {
          localStorage.setItem('user' , JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  }


  register(model: any){
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map((user: User) => {
        if (user){
          localStorage.setItem('user' , JSON.stringify(user)); 
          this.currentUserSource.next(user);
        }
      })
    )
  }

  setCurrentUser(user : User){
    this.currentUserSource.next(user);
  }

  logout(){debugger
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
