import { Component, OnInit, ViewChild} from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

import { SesionService } from 'src/app/services/sesion.service';
import { EventSettingsModel, EventFieldsMapping, ScheduleComponent,DayService, WeekService, WorkWeekService, MonthService, PopupOpenEventArgs, ActionEventArgs } from '@syncfusion/ej2-angular-schedule';
import { ThisReceiver } from '@angular/compiler';
import { NotasService } from 'src/app/services/notas.service';



@Component({
  selector: 'app-view-notas',
  templateUrl: './view-notas.component.html',
  styleUrls: ['./view-notas.component.css']
})





export class ViewNotasComponent implements OnInit {

  constructor(private snack:MatSnackBar, private sesionService:SesionService, private notasService:NotasService) { }

  @ViewChild("scheduleObj")
  public scheduleObj!: ScheduleComponent;

  /*lista de pacientes MODIFICAR a una mejor practica de angular*/ 
  public sesiones: any = [
    
  ]

  public views: Array<string> = ['Day', 'Week', 'WorkWeek', 'Month'];
  public selectedDate: Date = new Date(2018, 1, 15);
  public showQuickInfo: Boolean = false;
  

  public nota = {
    notaSesion:'',
    sesionId:{
      id:''
    }
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
    }
  ]



  ngOnInit(): void {
   /* this.sesionService.listarSesiones()
    .subscribe(sesioneslista => {
      this.sesiones = sesioneslista;
      console.log(JSON.stringify(sesioneslista));
      console.log(sesioneslista[0]);

    }
    );
*/
    this.sesionService.listar().subscribe(
      (data:any) => {
        this.scheduleObj.addEvent(data);
      }
    );
    //const scheduleData = this.sesiones;
    

  }


  public onPopupOpen(args: PopupOpenEventArgs): void {
    console.log('haz abierto uno de los pops');
    console.log(args);
   // console.log(args.data?.values.Id);
    //console.log(args.data?.values.Subject);
    //console.log(args.data['id']);
    console.log( (<{ [key: string]: Object }>(args.data))['nota'] as string);
    console.log( (<{ [key: string]: Object }>(args.data))['id'] as string);
  }



  public onActionBegin(args: ActionEventArgs): void {
    console.log(args);
    //console.log(args.data?.values.Titulo);
    //console.log(args.data?.values.Nota);
    

    if(args.requestType == 'eventCreate') {
      console.log("se toco el boton de saveeeeeee");
      console.log(args.data);  
      this.nota.notaSesion = (<{ [key: string]: Object }>(args.data))['nota'] as string;
      this.nota.sesionId.id = (<{ [key: string]: Object }>(args.data))['id'] as string;
      console.log(this.nota.notaSesion);
      console.log(this.nota.sesionId.id);

    }
    if(args.requestType == 'eventRemove') {
      console.log("se toco el boton de delete");
      console.log(args.data);
    }
    if(args.requestType == 'eventChange') {
      console.log("se toco el boton de actualizar");
      console.log(args.data);
      this.nota.notaSesion = (<{ [key: string]: Object }>(args.data))['nota'] as string;
      this.nota.sesionId.id = (<{ [key: string]: Object }>(args.data))['id'] as string;
      console.log(this.nota.notaSesion);
      console.log(this.nota.sesionId.id);


      /*guardando el valor de la nota */
      this.notasService.guardarNota(this.nota).subscribe(
        (data) => {
          console.log(data);
          Swal.fire('Nota guardada','Nota registrada con exito en el sistema','success');
        },(error) => {
          console.log(error);
          this.snack.open('Ha ocurrido un error en el sistema !!','Aceptar',{
            duration : 3000
          });
        }
      )


    }
  }




  public imprimir(): void {
    var notas = [];
    notas.push(
      {
        "sesionId": {
            "id": 5
        },
        "notaSesion": "mi prueba"
    })
    notas.push(
      {
        "sesionId": {
            "id": 5
        },
        "notaSesion": "queridisima prueba"
    })


   // console.log((JSON.stringify(carros)));
    /*let carro = {
      "color": "rojo",
      "typo": "cabrio",
    }

    let carro2 = {
      "color": "verde",
      "typo": "cabrio",
    }
    carros.push(carro);
    carros.push(carro2);*/

    console.log(notas);


    /*guardando varias nota */
    this.notasService.guardarvariasNota(notas).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Notas guardada','Notas registrada con exito en el sistema','success');
      },(error) => {
        console.log(error);
        this.snack.open('Ha ocurrido un error en el sistema !!','Aceptar',{
          duration : 3000
        });
      }
    )



  }



  public eventSettings: EventSettingsModel = {
    dataSource: this.sesiones,
    fields: {
      id: 'id',
      subject: { name: 'subject' },
      description: { name: 'description' },
      startTime: { name: 'startTime' },
      endTime: { name: 'endTime' },
    }
      };
   
    


 
  





}
