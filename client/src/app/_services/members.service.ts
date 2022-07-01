import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
//import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../_Models/Member';
import { MemberUpdate } from '../_Models/MemberUpdate';




// const key=localStorage.getItem('user');
// var keyPass:string;
// if(key){
//   keyPass=key;
// }else{
//   keyPass="apj";
// }
// const httpOptions={
//   headers:new HttpHeaders({
//     Authorization:'Bearer '+ JSON.parse(keyPass).token
//   })
// }




@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseUrl=environment.apiUrl+'users';
  //url=this.baseUrl+'users';
  //for saving the data in service insted of calling every time

  members:Member[]=[];

  

  constructor(private http:HttpClient) { }

  GetMembers(){
    if(this.members.length > 0) return of(this.members);
   return this.http.get<Member[]>(this.baseUrl).pipe(
    map((mem: Member[])=>{
      this.members=mem;
      return mem;
    })
   );
  }

  GetMember(username:string){
    const member=this.members.find(x=>x.userName===username);
    if(member!== undefined) return of(member);
    return this.http.get<Member>(`${this.baseUrl}/${username}`);
   }

   UpdateMember(member:Member){

    return this.http.put(this.baseUrl,member).pipe(
      map(()=>{
        const index=this.members.indexOf(member);
        this.members[index]=member;
      })
    );
    
   }


}

