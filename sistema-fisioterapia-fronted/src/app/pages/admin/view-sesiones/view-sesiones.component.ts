import { Component, OnInit, ViewChild } from '@angular/core';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';

import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { DateTimePicker } from '@syncfusion/ej2-calendars';

import { UserService } from 'src/app/services/user.service';
import { LesionesService } from 'src/app/services/lesiones.service';
import { EventSettingsModel, EventFieldsMapping, ScheduleComponent,DayService, WeekService, WorkWeekService, MonthService, PopupOpenEventArgs, ActionEventArgs } from '@syncfusion/ej2-angular-schedule';
import { SesionService } from 'src/app/services/sesion.service';


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
    id:'',
    subject:'',
    description:'',
    startTime:'',
    endTime:'',
    pacienteId:{
      usuarioId:''
    },
    fisioterapeutaId:{
      usuarioId:''
    }
  }

  /* {
    Endtime:'',
    prototype: {
      }
  }*/


  constructor(private snack:MatSnackBar, private userService:UserService
    , private lesionService:LesionesService, private sesionService:SesionService) { }

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
        Subject: 'la prueba yyyyyyyyyy ',
        StartTime: '2018-02-12T17:30:00.000Z',
        EndTime: '2018-02-12T19:00:00.000Z',
        CategoryColor: '#1aaa55'
    }, {
        Id: 2,
        Subject: 'Esta es mi primera prueba',
        StartTime: '2018-02-13T17:30:00.000Z',
        EndTime: '2018-02-13T19:30:00.000Z',
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
        console.log(args);
        console.log("se toco el boton de Save");
        console.log("*********ESTA ES LA SOLUCIOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOON*****************-");
        var json = JSON.parse(JSON.stringify(args));
        console.log(json['data']);
        console.log("***2do paso :#");
        console.log(json.data[0].Subject);
        console.log(json.data[0].StartTime);
        console.log("***********************************************-");

        this.sesion.subject = json.data[0].Subject;
        this.sesion.startTime = json.data[0].StartTime;
        this.sesion.endTime = json.data[0].EndTime;
        this.sesion.description = json.data[0].Description;
        this.sesion.pacienteId.usuarioId = (this.dropDownListObject.value).toString();
        this.sesion.fisioterapeutaId.usuarioId = (this.dropDownListObject.value).toString();
        

        this.sesionService.guardarSesion(this.sesion).subscribe(
          (data) => {
            console.log(data);
            Swal.fire('Sesion guardada','Sesion registrada con exito en el sistema','success');
          },(error) => {
            console.log(error);
            this.snack.open('Ha ocurrido un error en el sistema !!','Aceptar',{
              duration : 3000
            });
          }
        )




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




}
