export class DateRangeContainer {

    protected dateRange : any = "";

  
    public recieveMessage($event){
      console.log('data range!');
      console.log($event)
      this.dateRange = $event;
    }

    
}
