import { Component, OnInit, ViewChild } from '@angular/core';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { DateTimePicker } from '@syncfusion/ej2-calendars';

import { UserService } from 'src/app/services/user.service';
import { LesionesService } from 'src/app/services/lesiones.service';
import { EventSettingsModel, ScheduleComponent,DayService, WeekService, WorkWeekService, MonthService, PopupOpenEventArgs, ActionEventArgs } from '@syncfusion/ej2-angular-schedule';
import { SesionService } from 'src/app/services/sesion.service';
import { L10n } from '@syncfusion/ej2-base';
import { LoginService } from 'src/app/services/login.service';
import { ResourceLoader } from '@angular/compiler';
import { load } from '@syncfusion/ej2-angular-grids';



L10n.load({
  'en-US': {
      'schedule': {
          'saveButton': 'Adicionar',
          'cancelButton': 'Cerrar',
          'newEvent': 'Nueva Sesión',
          'editEvent': false,
          'deleteButton': false,
      },
  }
});

@Component({
  selector: 'app-view-sesiones',
  templateUrl: './view-sesiones.component.html',
  styleUrls: ['./view-sesiones.component.css']
})




export class ViewSesionesComponent implements OnInit {

/************************* CONFIGURANDO EL DROPDOWNLIST ********************************************* */ 
 /* Llamando la objeto que muestra la lista de Pacientes */
  @ViewChild('dropdownlistaPacientes')
  public dropDownListObject !: DropDownListComponent;
  public dataFields: Object = {text:'username', value:'usuarioId'};
  public dropdownListFilterType: string='Contains';
  /*Objeto para obtener la lista de pacientes*/ 
  pacientes:any = []


  /************************* CONFIGURANDO EL SEGUNDO DROPDOWNLIST ********************************************* */ 
 /* Llamando la objeto que muestra la lista de lesiones */
  @ViewChild('dropdownlistaLesiones')
  public dropDownListObject2 !: DropDownListComponent;
  public dataFields2: Object = {text:'nombreLesion', value:'lesionId'};
  public dropdownListFilterType2: string='Contains';
  /*Objeto para obtener la lista de lesiones*/ 
  lesiones:any = []



  /************************* CONFIGURANDO EL SCHEDULE OBJECT********************************************* */ 
  /* Llamando al objeto Calendario para programar sesiones */
  @ViewChild('scheduleObj')
  public scheduleObj!: ScheduleComponent;
  /* Configurando la fecha actual */
  public selectedDate: Date = new Date();
  /* Seleccionando los dias de trabajo */
  public workWeekDays: number[] = [1, 2, 3, 4, 5, 6];
  public showWeekend: boolean = false;
  /* Seleccionando un rango de fechas */
  public minDate: Date = new Date(this.selectedDate.getTime()-(1000 * 60 * 60 * 24 * 1));
  public maxDate: Date = new Date(this.selectedDate.getTime()+(1000 * 60 * 60 * 24 * 30));
  /* Configurando los dias que se puede ver */
  public views: Array<string> = ['Day', 'Week', 'Month'];
  public showQuickInfo: Boolean = false;
  /* Objeto para recibir las sesiones */
  public sesiones: any = []
  /* Configurando los campos ya que el JSON devuelve todo el minuscula */
  /* validacion */
 /* si queremos hacer validacion minValidation: (args: { [key: string]: string }) => boolean = (args: { [key: string]: string }) => {
    return args['value'].length >= 5;
  };*/
  public eventSettings: EventSettingsModel = {
    dataSource: this.sesiones,
    fields: {
      id: 'id',
      subject: { name: 'subject'},
      description: { name: 'description' },
      startTime: { name: 'startTime' },
      endTime: { name: 'endTime' }
    }};
  /* obteniendo el objeto user*/
  public user:any;

 

  /* ---- Objeto sesion para almacenar las sesiones en la Base de Datos */
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
    },
    lesionId:{
      lesionId: ''
    }
  }


  constructor(private snack:MatSnackBar, private userService:UserService
    ,private lesionService:LesionesService, private sesionService:SesionService,
    private loginService:LoginService, private router:Router) { }

  


  ngOnInit(): void {
    /* ---- INGRESANDO LOS DATOS DE PACIENTES EN EL DROPDOWN ---- */
    /* Obteniendo el codigo del fisioterapeuta */
    this.user = this.loginService.getUser();
    this.sesion.fisioterapeutaId.usuarioId = this.user.usuarioId; 
    
    /* Llenando la lista de pacientes */
    this.userService.listaPacientes().subscribe(
      (dato:any) =>{
        this.pacientes = dato;
      },
      (error) => {
        console.log(error);
      }
    )
    /* ---- FINALIZA: INGRESANDO LOS DATOS DE PACIENTES EN EL DROPDOWN ---- */

    /* ---- OBTENIENDO LOS DATOS DE LAS SESIONES ---- */
    this.sesionService.listar().subscribe(
      (data:any) => {
        console.log("el data")
        console.log(data)
        this.scheduleObj.addEvent(data);
      }
    );
    /* ---- FINALIZA: OBTENIENDO LOS DATOS DE LAS SESIONES ---- */
  }


  /*-------------------------- LLENANDO EL SEGUNDO DROPDOWN  -------------------------- */
  public pacienteChange(): void {
    /* Llenando la lista de lesiones */
    this.lesionService.listarLesionesPaciente((this.dropDownListObject.value).toString()).subscribe(
      (dato:any) =>{
        console.log(dato);
        this.lesiones = dato;
      },
      (error) => {
        console.log(error);
      }
    )

  }







  
  /* ***************** FUNCION PARA CADA VEZ QUE SE ABRE LA VENTANA DE NUEVO EVENTO************************** */

    onPopupOpen(args: PopupOpenEventArgs): void {
      /* Evitando que se abra el popup de editar y eliminar */
      if(((<{ [key: string]: Object }>(args.data))['id'] as string) != undefined){
        args.cancel = true;
      }
      //var json = JSON.parse(JSON.stringify(args));
        /* -------- CONFIGURANDO LOS CAMPOS DE FECHA PARA QUE APAREZCAN COMO FECHAS ----*/
      if (args.type === 'Editor' && this.dropDownListObject.value != null) {
        if(this.dropDownListObject2.value!=null){
          let startElement: HTMLInputElement = args.element.querySelector('#StartTime') as HTMLInputElement;
        if (!startElement.classList.contains('e-datetimepicker')) {
            startElement.value = (<{ [key: string]: Object }>(args.data))['startTime'] as string;
            new DateTimePicker({ value: new Date(startElement.value) || new Date() }, startElement);
        }
        let endElement: HTMLInputElement = args.element.querySelector('#EndTime') as HTMLInputElement;
        if (!endElement.classList.contains('e-datetimepicker')) {
            endElement.value = (<{ [key: string]: Object }>(args.data))['endTime'] as string;
            new DateTimePicker({ value: new Date(endElement.value) || new Date() }, endElement);
        }
        /* -------- FINALIZA: CONFIGURANDO LOS CAMPOS DE FECHA PARA QUE APAREZCAN COMO FECHAS ----*/
        }else{
            /* -------- VERIFICANDO QUE SE HAYA ESCOGIDO UNA LESION EN EL DROPDOWN ----*/
          args.cancel = true;
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Debes escoger una lesion para programar la lesion!!!',
          })
          /* -------- FINALIZA: VERIFICANDO QUE SE HAYA ESCOGIDO UNA LESION EN EL DROPDOWN ----*/ 
        }
      }else{
         /* -------- VERIFICANDO QUE SE HAYA ESCOGIDO A UN PACIENTE EN EL DROPDOWN ----*/
        args.cancel = true;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Debes escoger a un paciente antes de programar una sesion!!!',
        })
        /* -------- FINALIZA: VERIFICANDO QUE SE HAYA ESCOGIDO A UN PACIENTE EN EL DROPDOWN ----*/ 
      }       
  }



  
  /******************* FUNCION PARA REALIZAR ACCIONES CUANDO SE HACE CLICK EN SAVE************************ */ 
  public onActionBegin(args: ActionEventArgs): void {
    /* En caso de que se seleccione el boton create */
    if(args.requestType == 'eventCreate') {
      /* Primero se convierte los datos obtenidos en una cadena string*/
        var json = JSON.parse(JSON.stringify(args));
        /* Se obtiene los valores y se los coloca el objeto sesion para guardarlo */
        this.sesion.subject = json.data[0].Subject;
        this.sesion.startTime = json.data[0].StartTime;
        this.sesion.endTime = json.data[0].EndTime;
        this.sesion.description = json.data[0].Description;
        this.sesion.lesionId.lesionId = (this.dropDownListObject2.value).toString()
        this.sesion.pacienteId.usuarioId = (this.dropDownListObject.value).toString();
        

        /* ---- GUARDANDO LA SESION EN EL SISTEMA ---- */
        this.sesionService.guardarSesion(this.sesion).subscribe(
          (data) => {
            location.reload()
            Swal.fire('Sesion guardada','Sesion registrada con exito en el sistema','success');
            
          },(error) => {
            this.snack.open('Ha ocurrido un error en el sistema !!','Aceptar',{
              duration : 3000
            });
            /*---- Error 500 es error al guardar la sesion ---- */
            if(error.status === 500){
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al guardar la sesion!!!',
              })
            }
            /* ---- Error 0 en caso de que no haya conexion con el Backend ---- */
            if(error.status === 0){
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No hay conexión con el Servidor',
              })
            }
          }
        )
        /* ---- FINALIZA:  GUARDANDO LA SESION EN EL SISTEMA---- */
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
