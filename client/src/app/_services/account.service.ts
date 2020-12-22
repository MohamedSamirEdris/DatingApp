import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
// import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
    baseUrl = environment.apiUrl;
    private currentUserSource = new ReplaySubject<User>();
    currentUser$ = this.currentUserSource.asObservable();
    loggedInUser : User | null = null;

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
        }
      })
    )
  }

  setCurrentUser(user : User){
    this.currentUserSource.next(user);
  }

  userExists(){
    var user = localStorage.getItem('user');
    if(user){
      return true;
    }
    return false;
  }

  logout(){debugger
    localStorage.removeItem('user');
    this.currentUserSource.next();
    this.loggedInUser = null;
  }
}
