import { Component, OnInit, ViewChild } from '@angular/core';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';

import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { DateTimePicker } from '@syncfusion/ej2-calendars';

import { UserService } from 'src/app/services/user.service';
import { LesionesService } from 'src/app/services/lesiones.service';
import { EventSettingsModel, EventFieldsMapping, ScheduleComponent,DayService, WeekService, WorkWeekService, MonthService, PopupOpenEventArgs, ActionEventArgs } from '@syncfusion/ej2-angular-schedule';


@Component({
  selector: 'app-view-sesiones',
  templateUrl: './view-sesiones.component.html',
  styleUrls: ['./view-sesiones.component.css']
})
export class ViewSesionesComponent implements OnInit {
  @ViewChild('scheduleObj')
  public scheduleObj!: ScheduleComponent;





  @ViewChild('dropdownlistaPacientes')
  public dropDownListObject !: DropDownListComponent;

  public dataFields: Object = {text:'username', value:'usuarioId'};
  public dropdownListFilterType: string='Contains';

  /*lista de pacientes MODIFICAR a una mejor practica de angular*/ 
  pacientes:any = [
  ]

  public sesion = {
    id: "",
    titulo : "",
    start :"",
    descripcion : "",
    from : ""
  }

  /* {
    Endtime:'',
    prototype: {
      }
  }*/


  constructor(private snack:MatSnackBar, private userService:UserService
    , private lesionService:LesionesService) { }

  /*Metiendo los datos en el Dropdown*/ 
  ngOnInit(): void {
    this.userService.listaPacientes().subscribe(
      (dato:any) =>{
        this.pacientes = dato;
        console.log(this.pacientes);
      },
      (error) => {
        console.log(error);
      }
    )
  }


  public datapicker: Object[] = [
    {
        Id: 1,
        Subject: 'Explosion of Betelgeuse Star',
        StartTime: new Date(2018, 1, 11, 9, 30),
        EndTime: new Date(2018, 1, 11, 11, 0),
        CategoryColor: '#1aaa55'
    }, {
        Id: 2,
        Subject: 'Thule Air Crash Report',
        StartTime: new Date(2018, 1, 12, 12, 0),
        EndTime: new Date(2018, 1, 12, 14, 0),
        CategoryColor: '#357cd2'
    }, {
        Id: 3,
        Subject: 'Blue Moon Eclipse',
        StartTime: new Date(2018, 1, 13, 9, 30),
        EndTime: new Date(2018, 1, 13, 11, 0),
        CategoryColor: '#7fa900'
    }, {
        Id: 4,
        Subject: 'Meteor Showers in 2018',
        StartTime: new Date(2018, 1, 14, 13, 0),
        EndTime: new Date(2018, 1, 14, 14, 30),
        CategoryColor: '#ea7a57'
    }, {
        Id: 5,
        Subject: 'Milky Way as Melting pot',
        StartTime: new Date(2018, 1, 15, 12, 0),
        EndTime: new Date(2018, 1, 15, 14, 0),
        CategoryColor: '#00bdae'
    }, {
        Id: 6,
        Subject: 'Mysteries of Bermuda Triangle',
        StartTime: new Date(2018, 1, 15, 9, 30),
        EndTime: new Date(2018, 1, 15, 11, 0),
        CategoryColor: '#f57f17'
    }
  ]



  public selectedDate: Date = new Date(2018, 1, 15);
    public views: Array<string> = ['Day', 'Week', 'WorkWeek', 'Month'];
    public showQuickInfo: Boolean = false;
    public eventSettings: EventSettingsModel = {
        dataSource: this.datapicker
    };
    onPopupOpen(args: PopupOpenEventArgs): void {
        if (args.type === 'Editor') {
            
            let startElement: HTMLInputElement = args.element.querySelector('#StartTime') as HTMLInputElement;
            if (!startElement.classList.contains('e-datetimepicker')) {
                new DateTimePicker({ value: new Date(startElement.value) || new Date() }, startElement);
            }
            let endElement: HTMLInputElement = args.element.querySelector('#EndTime') as HTMLInputElement;
            if (!endElement.classList.contains('e-datetimepicker')) {
                new DateTimePicker({ value: new Date(endElement.value) || new Date() }, endElement);
            }
            console.log(this.datapicker);
            console.log(this.datapicker.toString());
        }
  }

  //args: ActionEventArgs

  public onActionBegin(args: ActionEventArgs): void {
    console.log(args);
    console.log(args.data?.values.Subject);
    console.log(args.data?.values.StartTime);
    

  /*  if (args.requestType === 'Editor' && !isNullOrUndefined(args.data)) {
      let subjectElement = args.element.querySelector('#Subject')
        if (subjectElement) {
            args.data.Subject = subjectElement.value
        }
    let statusElement = args.element.querySelector('#EventType')
    if (statusElement) {
      args.data.EventType = statusElement.value
    }}
    */

    if(args.requestType == 'eventCreate') {
        console.log("se toco el boton de Save");
        console.log(this.sesion.titulo);
        console.log(this.sesion.descripcion);
        console.log(this.sesion.start);
        console.log(this.sesion.from);
        console.log("se t-----------------------------");

        console.log("el arg data");
        //console.log(args.data[0].EndTime);
        
       // let startElement: HTMLInputElement = args.values.querySelector('#StartTime') as HTMLInputElement;
        var fecha = args.data; 

        console.log("el arg data tipo");
        console.log(typeof args.data);
        
        console.log("el arg values");
        console.log(args.data?.values);

        console.log("prueba");
        //console.log(args.data?.values.StartTime.getTime);
        console.log(args.data?.values.startElement);
        
        const name: object = args.data as object;
        //name.values.StartTime;

        /*
        let eventData: any = args.data as any;
        let eventField: EventFieldsMapping = this.scheduleObj.eventFields;
        let startDate: Date = (((<Object[]>args.data).length > 0)
            ? eventData[0][eventField.startTime] : eventData[eventField.startTime]) as Date;
        let endDate: Date = (((<Object[]>args.data).length > 0)
            ? eventData[0][eventField.endTime] : eventData[eventField.endTime]) as Date;
*/





        console.log("intentando convertir");
        console.log(args.addedRecords?.toString);

        console.log("obteniendo los valores aparte");
        console.log(args);

        console.log(args.data?.values.Subject.toString());
        console.log(args.data?.values.StartTime);
            
    }


    if(args.requestType == 'eventRemove') {
      console.log("se toco el boton de delete");
      console.log(args.data);
    }
    if(args.requestType == 'eventChange') {
      console.log("se toco el boton de actualizar");
      console.log(args.data);
    }

  
  }



  /*SEGUNDA PRUEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA */




  minValidation: (args: { [key: string]: string }) => boolean = (args: { [key: string]: string }) => {
    return args['value'].length >= 5;
  };
  public selectedDate2: Date = new Date(2018, 1, 15);
  public views2: Array<string> = ['Day', 'Week', 'WorkWeek', 'Month', 'Agenda'];
  public eventSettings2: EventSettingsModel = {
      dataSource: this.datapicker,
      fields: {
          id: 'Id',
          subject: { name: 'Subject', validation: { required: true } },
          location: { name: 'Location', validation: { required: true } },
          description: {
              name: 'Description', validation: {
                  required: true, minLength: [this.minValidation, 'Need atleast 5 letters to be entered']
              }
          },
          startTime: { name: 'StartTime', validation: { required: true } },
          endTime: { name: 'EndTime', validation: { required: true } }
      }
  };


  
  public eljson: Object[] = [
  {"requestType":"eventCreate",
  "cancel":false,
  "data":
  /* esto tiene un array adentro un objeto json  */
  [
    {
      "Subject":"aaaaaaaaaaaa",
      "Id":7,
      "StartTime":"2018-02-14T15:00:00.000Z",
      "EndTime":"2018-02-14T15:30:00.000Z",
      "IsAllDay":false
    }],
    "addedRecords":
    [
      {"Subject":"aaaaaaaaaaaa",
      "Id":7,"StartTime":"2018-02-14T15:00:00.000Z",
      "EndTime":"2018-02-14T15:30:00.000Z",
      "IsAllDay":false}],

    "changedRecords":[],
    "deletedRecords":[],
    "name":
    "actionBegin"}]



  public onActionBegin2(args: ActionEventArgs): void {
    console.log("la prueba del segundo calendario---------");
    console.log(args);

    console.log("la prueba del segundo calendario------22-");
    console.log(args["data"]);
    
    console.log(typeof args["data"]);
    var hola = args["data"];
    
    

/** */
    console.log("*********ESTA ES LA SOLUCIOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOON*****************-");
    var json = JSON.parse(JSON.stringify(args));
    console.log(json['data']);
    console.log("***2do paso :#");
    console.log(json.data[0].Subject);
    console.log(json.data[0].StartTime);
    console.log("***********************************************-");

    hola

    /**/ 
    console.log("hola estoy ingresando entrar al data");
    for (const role in hola) {
      console.log(JSON.stringify(role));
      console.log(typeof role);
      console.log(role.valueOf);
      console.log(role["0"]);
    }

    

    console.log("la prueba del subject-");
    console.log(hola?.length);

   
    
    



    console.log("values------22-");

    /*let result = hola.next();
    while (!result.done) {
        console.log(result.value); // 1 3 5 7 9
        result = hola.next();
      }*/



    console.log(hola?.keys());
    let claves = hola?.keys;
    for(let i=0; i<claves.length; i++){
      let clave = claves[i];
      console.log("-+++++++++++++++++++++++++++");
      let result = clave.next();
      while (!result.done) {
      console.log(result.value); // 1 3 5 7 9
      result = clave.next();
      }
      console.log("-+++++++++++++++++++++++++++");


      console.log(clave);


      

    }
   /* for(var i=0; i<hola.length; i++) {


    }*/

    
    


    console.log("tratando de convertir a json---------");
    console.log(JSON.stringify(args));

    var myjson = JSON.stringify(args);

    console.log("probando abrir el json--------");
    console.log(JSON.stringify(args, ["Subject"]));

    //myjson['members'][1]['powers'][2];
   // myjson["data"];
  




    console.log(args.data?.values[0]);
    console.log(args.data?.values.StartTime);
    console.log("prueba???????---------");
    console.log(this.eventSettings2.fields?.startTime);
    console.log(this.eventSettings2.fields?.subject);
    console.log(args.data?.values['StartTime']);
  }






}
