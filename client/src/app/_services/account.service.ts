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
    private currentUserSource = new ReplaySubject<User>();
    currentUser$ = this.currentUserSource.asObservable();
    loggedInUser : User | null = null;
    isLogged = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  login (model: any){
    return this.http.post<User>(this.baseUrl + 'account/login' , model).pipe(
      map((reponse: User) => {
        const user = reponse;
        if (user) {
          localStorage.setItem('user' , JSON.stringify(user));
          this.currentUserSource.next(user);
          // Set the logged in user and flag
          this.loggedInUser = user;
          this.isLogged = true;
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
          // Set the logged in user flag
          this.loggedInUser = user;
          this.isLogged = true;
        }
      })
    )
  }

  setCurrentUser(user : User){
    this.currentUserSource.next(user);
  }

  logout(){debugger
    localStorage.removeItem('user');
    this.currentUserSource.next();
    this.loggedInUser = null;
    this.isLogged = false;
  }
}
