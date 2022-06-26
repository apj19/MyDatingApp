import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model:any={};
  constructor(private accountService:AccountService) { }

  ngOnInit(): void {
  }

  register(){
    this.accountService.register(this.model).subscribe(data=>{
      console.log(data);
      
    },error=>{
      console.log(error);
      
    })
    console.log(this.model);
    
  }

  cancle(){
    console.log("Cancled");
    
  }

}
