import { Component, OnInit, ViewChild } from '@angular/core';
import { Member } from 'src/app/_Models/Member';
import { User } from 'src/app/_Models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import{take} from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { MemberUpdate } from 'src/app/_Models/MemberUpdate';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editFrom') editFrom!:NgForm;
  member!:Member;
  user!:any;
  // memberUpdate: MemberUpdate={
  //   introduction: '',
  //   lookingFor: '',
  //   intrestes: '',
  //   city: '',
  //   country: ''
  // };

  constructor(private accountService:AccountService, private memberService:MembersService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(use=>this.user=use);
   }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(){
    this.memberService.GetMember(this.user['username']).subscribe(mem=>this.member=mem)
  }

  UpdateMember(){
    
    // this.memberUpdate.introduction=this.member.introduction;
    // this.memberUpdate.lookingFor= this.member.lookingFor;
    // this.memberUpdate.intrestes= this.member.intrestes;
    // this.memberUpdate.city=this.member.city;
    // this.memberUpdate.country=this.member.country;
    // console.log(this.memberUpdate);
    //no need to crete api will take what is mention in dtio in api
    this.memberService.UpdateMember(this.member).subscribe(()=>{
      this.editFrom.reset(this.member);
    });
    
    
  }

}
