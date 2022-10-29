/*import { Component, ViewChild } from '@angular/core';
import {
DayService, TimelineViewsService, WorkWeekService, MonthService, ActionEventArgs, ScheduleComponent,
EventSettingsModel, EventFieldsMapping
} from '@syncfusion/ej2-angular-schedule';
import { isNullOrUndefined } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements ngOnInit {

  constructor() { }

  ngOnInit(): void {
  }
 


/*selector: 'app-root',
providers: [DayService, TimelineViewsService, WorkWeekService, MonthService],*/
// specifies the template string for the Schedule component
//template: 
//`<ejs-schedule width='100%' #scheduleObj height='550px' [selectedDate]="selectedDate"
 // [eventSettings]="eventSettings" (actionBegin)="onActionBegin($event)"></ejs-schedule>`

/*@ViewChild('scheduleObj')
public scheduleObj!: ScheduleComponent;
public selectedDate: Date = new Date(2018, 1, 15);
public eventSettings: EventSettingsModel = {
    dataSource: scheduleData,
};

onActionBegin(args: ActionEventArgs) {
    /*if ((args.requestType === 'eventCreate' || args.requestType === 'eventChange') && (<Object[]>args.data).length > 0
        || !isNullOrUndefined(args.data)) {*/

          /*estoy acaaaaaaaaaaaaaaaaaaaaaaaa*/ 
    //    const name: object = args.data as object;




      /*  let eventData: any = args.data as any;
        let eventField: EventFieldsMapping = this.scheduleObj.eventFields;
        let startDate: Date = (((<Object[]>args.data).length > 0)
            ? eventData[0][eventField.startTime] : eventData[eventField.startTime]) as Date;
        let endDate: Date = (((<Object[]>args.data).length > 0)
            ? eventData[0][eventField.endTime] : eventData[eventField.endTime]) as Date;
        args.cancel = !this.scheduleObj.isSlotAvailable(startDate, endDate);*/
   // }
    
  
  //}
  import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

