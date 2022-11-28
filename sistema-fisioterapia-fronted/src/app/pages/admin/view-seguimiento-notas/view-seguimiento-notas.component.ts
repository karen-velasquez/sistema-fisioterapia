import { Component, OnInit, ViewChild } from '@angular/core';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';
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
import { LoginService } from 'src/app/services/login.service'
import { NotasService } from 'src/app/services/notas.service';
import { TextWrapSettingsModel } from '@syncfusion/ej2-angular-grids';


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


 
 



 constructor(private snack:MatSnackBar, private userService:UserService
   ,private lesionService:LesionesService,
   private notasService: NotasService, private router:Router) { }

 


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


 
 }















