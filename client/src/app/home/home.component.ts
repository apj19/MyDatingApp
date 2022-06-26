import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  registorMode=false;
  ngOnInit(): void {
  }

  registor(){
    this.registorMode=!this.registorMode;
  }

}
