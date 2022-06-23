import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'client';
  user:any;

  
  constructor(private http:HttpClient) {
    
  }
  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.http.get('https://localhost:7044/api/users').subscribe(data=>{
      this.user=data;
    },error=>{
      console.log(error);
      
    });
  }

}
