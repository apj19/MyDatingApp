import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../_Models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model:any={}
  loggedIn:boolean=false;
  name:string='user';
  

  constructor(private accountservice :AccountService,private router:Router) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }
  login(){

    //console.log(this.model)
    this.accountservice.login(this.model).subscribe(data=>{
      this.router.navigateByUrl('/members');
      this.loggedIn=true;
      this.name=this.model.username;
      
    })
  }

  logout(){
    this.accountservice.logout();
    this.router.navigateByUrl('/');
    this.loggedIn=false;
  }

  getCurrentUser(){
    this.accountservice.currentUser$.subscribe(user=>{
      this.loggedIn=!!user;
    },error=>{
      console.log(error);
      
    })
  }

}
