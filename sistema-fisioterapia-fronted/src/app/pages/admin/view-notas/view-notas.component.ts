import { Component, OnInit, ViewChild} from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { L10n } from '@syncfusion/ej2-base';
import { SesionService } from 'src/app/services/sesion.service';
import { EventSettingsModel, ScheduleComponent, PopupOpenEventArgs, ActionEventArgs } from '@syncfusion/ej2-angular-schedule';
import { NotasService } from 'src/app/services/notas.service';

/************ CONFIGURNADO QUE BOTONES ESTARAN EN LA TABLA***************** */
L10n.load({
  'en-US': {
      'schedule': {
          'saveButton': 'Adicionar',
          'cancelButton': 'Cerrar',
          'newEvent': false,
          'editEvent': 'Nueva Nota',
          'deleteButton': false,
      },
  }
});

@Component({
  selector: 'app-view-notas',
  templateUrl: './view-notas.component.html',
  styleUrls: ['./view-notas.component.css']
})

export class ViewNotasComponent implements OnInit {

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
  public minDate: Date = new Date(this.selectedDate.getTime()-(1000 * 60 * 60 * 24 * 3));
  public maxDate: Date = new Date(this.selectedDate.getTime()+(1000 * 60 * 60 * 24 * 30));
  /* Configurando los dias que se puede ver */
  public views: Array<string> = ['Day', 'Week', 'Month'];
  public showQuickInfo: Boolean = false;
  /* Objeto para recibir las sesiones */
  public sesiones: any = []
  /* Configurando los campos ya que el JSON devuelve todo el minuscula */
  public eventSettings: EventSettingsModel = {
    dataSource: this.sesiones,
    fields: {
      id: 'id',
      subject: { name: 'subject'},
      description: { name: 'description' },
      startTime: { name: 'startTime' },
      endTime: { name: 'endTime' }
    }};


  
  /* ---- Objeto nota para almacenar las notas en la Base de Datos */
  public nota = {
    notaSesion:'',
    sesionId:{
      id:''
    },
    tituloNotaSesion: '',
    fechaNota: ''
  }

  /* ------------ CONSTRUCTOR ----------- */
  constructor(private snack:MatSnackBar, private sesionService:SesionService, private notasService:NotasService) { }


  ngOnInit(): void {
    var today = new Date();
    this.nota.fechaNota = today.toLocaleDateString('en-GB');

    /* ---- OBTENIENDO LOS DATOS DE LAS SESIONES ---- */
    this.sesionService.listar().subscribe(
      (data:any) => {
        this.scheduleObj.addEvent(data);
      }
    );
    /* ---- FINALIZA: OBTENIENDO LOS DATOS DE LAS SESIONES ---- */
  }


  /*-------------- FUNCION AL ABRIR LA VENTANA EMERGENTE ----------------- */
  public onPopupOpen(args: PopupOpenEventArgs): void {
    /* Esto es para que no crear una nota que no esta asignada a una sesion */
    if(((<{ [key: string]: Object }>(args.data))['id'] as string) === undefined){
      args.cancel = true;
    }
  }

  /*-------------- FUNCION AL GUARDAR O CERRAR LA VENTANA ----------------- */
  public onActionBegin(args: ActionEventArgs): void {
    /* En caso de que se seleccione el boton de actualizar este se considerara como el boton
    de guardar nota */
    if(args.requestType == 'eventChange') {
      console.log("se toco el boton de actualizar");
      this.nota.tituloNotaSesion = (<{ [key: string]: Object }>(args.data))['titulo'] as string;
      this.nota.notaSesion = (<{ [key: string]: Object }>(args.data))['nota'] as string;
      this.nota.sesionId.id = (<{ [key: string]: Object }>(args.data))['id'] as string;

      /*------ GUARDANDO LA NOTA EN LA BASE DE DATOS -----*/
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
      /*------ FINALIZA: GUARDANDO LA NOTA EN LA BASE DE DATOS -----*/
    }

  }



/*++++++++++++++++ ESTE CODIGO ES PARA CUANDO QUIERA GUARDAR LOS EJERCICIOS Y COMO TENGO QUE GUARDAR VARIOS A LA VEZ */
}
