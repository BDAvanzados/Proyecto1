import { Component, OnInit, Output , EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})


export class DatepickerComponent implements OnInit {
  myForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {}
 
  ngOnInit() {
    this.myForm = this.formBuilder.group({
      date: null,
      range: null
    });
    this.dataRange = [{date : new Date(), valid : false },{date : new Date(), valid : false}];
  }

  getData() {
    return this.myForm.getRawValue()
  }

  message : string = "data";
  dataRange : {date:Date,valid : boolean}[] ;

  @Output() messageEvent = new EventEmitter<{date:Date,valid : boolean}[]>();

  /*
  public obtainRange($event){
    console.log('setted a new value of data range!')
    console.log($event)
    this.dataRange = $event;
    this.sendMessage();

  }
  */

  datafrom : Date;
  datato : Date;

  public sendMessage($event,index){
    console.log("dates are changing");
    this.dataRange[index] = {date: $event, valid : true};
    this.messageEvent.emit(this.dataRange);
  }
/*
  public sendMessage(){
    if (this.dataRange != null && this.dataRange[0] != null){
      console.log('Month: ' + this.dataRange[0].getUTCMonth())
      console.log('Day: ' + this.dataRange[0].getUTCDay())
      console.log(this.dataRange[0].getDate());
    }
    //console.log('emitting: ' + this.dataRange);
    this.messageEvent.emit([this.datafrom,this.datato]);
  }
*/
}