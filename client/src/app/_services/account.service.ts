import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, ReplaySubject } from 'rxjs';
import { User } from '../_Models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl='https://localhost:7044/api/';
  private curresntUserSourse= new ReplaySubject(1);
  currentUser$=this.curresntUserSourse.asObservable();


  constructor(private http:HttpClient) { }

  login(model:any){
    return this.http.post<User>(this.baseUrl+'account/login',model).pipe(
      map((res:User)=>{
        var user= res;
        if(user){
          localStorage.setItem('user',JSON.stringify(user));
          this.curresntUserSourse.next(user);
        }
      })
    );
  }

  register(model:any){
    return this.http.post<User>(this.baseUrl+'account/register',model).pipe(
      map((res:User)=>{
        var user= res;
        if(user){
          localStorage.setItem('user',JSON.stringify(user));
          this.curresntUserSourse.next(user);
        }
        return user;
      })
    );
  }

  setCurrentUser(user:User){
    this.curresntUserSourse.next(user);
  }

  logout(){
    localStorage.removeItem('user');
    this.curresntUserSourse.next(null);
  }
}
