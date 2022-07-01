import { PathLocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Member } from 'src/app/_Models/Member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  // member:Member={
  //   id: 0,
  //   userName: '',
  //   photoUrl: '',
  //   age: 0,
  //   knownAs: '',
  //   created: new Date(),
  //   lastActive:new Date() ,
  //   gender: '',
  //   introduction: '',
  //   lookingFor: '',
  //   intrestes: '',
  //   city: '',
  //   country: '',
  //   photoId: 0,
  //   photos: []
  // };
  //or u can use if 
  member!:Member;
  galleryOtions!:NgxGalleryOptions[];
  gallayImages!:NgxGalleryImage[];

  constructor(private memberService:MembersService,private route:ActivatedRoute) { }

  ngOnInit(): void {
   this.loadMember();

   this.galleryOtions=[
    {
      width:'500px',
      height:'500px',
      imagePercent:100,
      thumbnailsColumns:4,
      imageAnimation:NgxGalleryAnimation.Slide,
      preview:false
    }
   ]

   
    
  }

  getImages():NgxGalleryImage[]{
    const imageUrls=[];
    for(const photo of this.member.photos){
      imageUrls.push({
        small:photo?.url,
        medium:photo?.url,
        big:photo?.url
      });
    }

    return imageUrls;
  }
  


  loadMember(){
    let name=this.route.snapshot.paramMap.get('username');
    if(name){
      this.memberService.GetMember(name).subscribe(member=>
         {this.member=member;
          this.gallayImages=this.getImages();
      });

    }
 
  }

}
