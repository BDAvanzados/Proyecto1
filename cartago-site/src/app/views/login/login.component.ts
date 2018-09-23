import { Component, OnInit } from '@angular/core';
import {CommonService} from  './../../services/common.service';


@Component({
  selector: 'view-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private commonService: CommonService) { }



  ngOnInit() {
    this.commonService.testDataBase().subscribe(test => console.log(test));
  }

}
