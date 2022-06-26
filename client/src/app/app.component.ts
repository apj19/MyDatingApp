import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_Models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'client';
  user:any;

  
  constructor(private http:HttpClient,private accountService:AccountService) {
    
  }
  ngOnInit() {
    //this.getUsers();
    this.setCurrentUser();
  }

  setCurrentUser(){
      var userjson=localStorage.getItem('user');
      if(userjson){
        const user:User=JSON.parse(userjson);
        this.accountService.setCurrentUser(user);
      }
    
   
  }

  getUsers(){
    this.http.get('https://localhost:7044/api/users').subscribe(data=>{
      this.user=data;
    },error=>{
      console.log(error);
      
    });
  }

}
