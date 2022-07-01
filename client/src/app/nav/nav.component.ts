import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '../_services/account.service';
import{take} from 'rxjs/operators';
import { User } from '../_Models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model:any={}
  loggedIn:boolean=false;
  name!:string;
  

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
      console.log(this.name);
      
      
    })
  }

  logout(){
    this.accountservice.logout();
    this.router.navigateByUrl('/');
    this.loggedIn=false;
  }

  getCurrentUser(){
    let obj:any;
    this.accountservice.currentUser$.pipe(take(1)).subscribe(use=>{
      obj=use;
      this.loggedIn=!!use;
      
        this.name=obj['username'];
      
      
      
    },error=>{
      console.log(error);
      
    })
  }

  

}
