import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'administrator',
  templateUrl: './administrator.html',
  styleUrls: ['./administrator.css']
})
export class AppAdministrator implements OnInit{
  title = 'cartago-site';
  public ngOnInit(){
    $('#v-pills-tab a').on('click',function(e){
      e.preventDefault()

      //ignore the error because v-pills-tab is a pill nav which contains tab method
      //@ts-ignore
      $(this).tab('show')
    });
  }
}





