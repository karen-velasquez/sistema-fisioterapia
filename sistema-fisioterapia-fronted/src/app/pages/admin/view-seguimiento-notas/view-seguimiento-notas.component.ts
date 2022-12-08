import { Component, OnInit, ViewChild } from '@angular/core';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { DateTimePicker } from '@syncfusion/ej2-calendars';
import { ViewPlotsComponent } from '../view-plots/view-plots.component';

import { UserService } from 'src/app/services/user.service';
import { LesionesService } from 'src/app/services/lesiones.service';
import { EventSettingsModel, ScheduleComponent,DayService, WeekService, WorkWeekService, MonthService, PopupOpenEventArgs, ActionEventArgs } from '@syncfusion/ej2-angular-schedule';
import { SesionService } from 'src/app/services/sesion.service';
import { L10n } from '@syncfusion/ej2-base';
import { LoginService } from 'src/app/services/login.service'
import { NotasService } from 'src/app/services/notas.service';
import { TextWrapSettingsModel } from '@syncfusion/ej2-angular-grids';
import { PlotSeguimientoService } from 'src/app/services/plot-seguimiento.service';


@Component({
  selector: 'app-view-seguimiento-notas',
  templateUrl: './view-seguimiento-notas.component.html',
  styleUrls: ['./view-seguimiento-notas.component.css']
})
export class ViewSeguimientoNotasComponent implements OnInit {
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



 /************************* CONFIGURANDO EL GRID TABLA DE NOTAS********************************************* */ 
  public data!: object[];
  public pageSettings!: PageSettingsModel;
  public wrapSettings!: TextWrapSettingsModel;


 
 
/************************** OTRAS CONFIGURACIONES ********************** */
  /* ---- Objeto nota para almacenar las notas en la Base de Datos */

  public datasetTimeFull !: [];

  datasetCoordinates:any = []
  datasetCoordinatesFull: any=[]
  data1:any=[]


 constructor(private snack:MatSnackBar, private userService:UserService
   ,private lesionService:LesionesService,
   private notasService: NotasService, private router:Router,
   private plotSeguimientoService: PlotSeguimientoService,
   private matdialog:MatDialog) { }

 


 ngOnInit(): void {
   /* ---- INGRESANDO LOS DATOS DE PACIENTES EN EL DROPDOWN ---- */

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



   //this.data = this.notas;
   this.pageSettings = { pageSize: 6 };
   this.wrapSettings = { wrapMode: 'Content' };

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
     //Aqui se obtiene el dato para el seguimiento
  this.plotSeguimientoService.listaCodigoAsignadosPacientebyId((this.dropDownListObject.value).toString()).subscribe(
    (data:any) => {
      if (data.length!=0){
        console.log('LOS DATOS SON:')
        console.log(data)
        for(let i=0; i< data.length; i++){
          let clave = data[i];
          console.log("++++++++++++++++++++++++++++++++++++++++++++++++++")
          /* ---- OBTENIENDO LOS DATOS DE LAS SESIONES ---- */
          this.plotSeguimientoService.obtenerCumplimientosAsignadobyId((this.dropDownListObject.value).toString(), String(clave[0])).subscribe(
            (dataCumplimiento:any) => {
              if(dataCumplimiento.length!=0){    
                this.datasetCoordinates = dataCumplimiento;
                this.datasetCoordinatesFull.push(
                {
                    label: clave[1],
                    data: this.datasetCoordinates,
                    borderWidth: 1
                });
                console.log(this.datasetCoordinatesFull)
              }
            }
          );
        }
      }
      //this.plot_bar_time(this.data1);
      //this.plot_bar_time();
      //this.plot_bar_time(this.data1);

    }
  );

 }


 public lesionChange(): void {
  /* Llenando la lista de notas */
  console.log("paciente"+(this.dropDownListObject.value).toString())
  console.log("lesion"+(this.dropDownListObject2.value).toString())
  this.notasService.listaNotasSesionPaciente((this.dropDownListObject.value).toString(), (this.dropDownListObject2.value).toString()).subscribe(
    (dato:any) =>{
      console.log(dato);
      this.data = dato;
      console.log("entre aqui")
    },
    (error) => {
      console.log(error);
    }
  )



}


public obtenerGrafico(): void {
  if(this.dropDownListObject.value != null){
    //VERIFICANDO QUE HAYA DATOS
    if(this.datasetCoordinatesFull.length!=0){
      console.log(this.datasetCoordinatesFull);
       /* ---- ENVIANDO MENSAJE AL POP UP ----- */
    this.matdialog.open(
      ViewPlotsComponent,{width:"70%", height:"70%",data: this.datasetCoordinatesFull}
      );

    }else{
      /* -------- VERIFICANDO QUE SE HAYA ESCOGIDO A UN PACIENTE EN EL DROPDOWN ----*/
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No hay datos para mostrar el grafico!!!',
      })
      /* -------- FINALIZA: VERIFICANDO QUE SE HAYA ESCOGIDO A UN PACIENTE EN EL DROPDOWN ----*/ 
      }
    
    
   
  }else{
    /* -------- VERIFICANDO QUE SE HAYA ESCOGIDO A UN PACIENTE EN EL DROPDOWN ----*/
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Debes escoger a un paciente para ver los graficos!!!',
    })
    /* -------- FINALIZA: VERIFICANDO QUE SE HAYA ESCOGIDO A UN PACIENTE EN EL DROPDOWN ----*/ 
    }
  }


}










