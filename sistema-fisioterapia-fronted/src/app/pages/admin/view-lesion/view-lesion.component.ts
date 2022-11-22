import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';

import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

import { UserService } from 'src/app/services/user.service';
import { LesionesService } from 'src/app/services/lesiones.service';


@Component({
  selector: 'app-view-lesion',
  templateUrl: './view-lesion.component.html',
  styleUrls: ['./view-lesion.component.css']
})
export class ViewLesionComponent implements OnInit {
  /************************* CONFIGURANDO EL DROPDOWNLIST ********************************************* */ 
 /* Llamando la objeto que muestra la lista de Pacientes */
 @ViewChild('dropdownlistaPacientes')
 public dropDownListObject !: DropDownListComponent;
 public dataFields: Object = {text:'username', value:'usuarioId'};
 public dropdownListFilterType: string='Contains';
 /*Objeto para obtener la lista de pacientes*/ 
 pacientes:any = []


/* ---- Objeto lesion para almacenar las lesiones en la Base de Datos */
  public lesion = {
    antecedentes : '',
    evaluacion : '',
    nombreLesion : '',
    pacienteId:{
      usuarioId:''
    }
  }
 

  constructor(private snack:MatSnackBar, private _ngZone: NgZone, private userService:UserService
    , private lesionService:LesionesService) {}


  ngOnInit(): void {
    /* ---- INGRESANDO LOS DATOS DE PACIENTES EN EL DROPDOWN ---- */
    this.userService.listaPacientes().subscribe(
      (dato:any) =>{
        this.pacientes = dato;
        console.log(this.pacientes);
      },
      (error) => {
        console.log(error);
      }
    )
    /* ---- FINALIZA: INGRESANDO LOS DATOS DE PACIENTES EN EL DROPDOWN ---- */
  }




  formSubmit(){
    /*Conviertiendo el valor a String*/
    console.log(this.lesion);
    /*-------------REVISANDO QUE NO  HAYA VALORES NULL O VACIOS---------------*/ 
    if(this.lesion.antecedentes.trim() == '' || this.lesion.antecedentes.trim() == null){
      this.snack.open('Los antecedentes son requeridos !!','Aceptar',{
        duration:3000
      })
      return;
    }

    if(this.lesion.evaluacion.trim() == '' || this.lesion.evaluacion.trim() == null){
      this.snack.open('La evaluacion es requerida !!','Aceptar',{
        duration:3000
      })
      return;
    }

    if(this.lesion.nombreLesion.trim() == '' || this.lesion.nombreLesion.trim() == null){
      this.snack.open('El nombre de la lesion es requerido!!','Aceptar',{
        duration:3000
      })
      return;
    }

    if(this.dropDownListObject.value == null){
      this.snack.open('Debes escoger a un paciente!!','Aceptar',{
        duration:3000
      })
      return;
    }else{
      this.lesion.pacienteId.usuarioId = (this.dropDownListObject.value).toString();
    }
    /*--------------FINALIZA: REVISANDO QUE NO  HAYA VALORES NULL O VACIOS-----------------------*/ 


    /*------------------------GUARDANDO LA LESION EN EL SISTEMA ------------------- */
    this.lesionService.guardarLesion(this.lesion).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Lesion guardada','Lesion registrada con exito en el sistema','success');
      },(error) => {
        console.log(error);
        this.snack.open('Ha ocurrido un error en el sistema !!','Aceptar',{
          duration : 3000
        });
      }
    )
    /*------------------------FINALIZA: GUARDANDO LA LESION EN EL SISTEMA ------------------- */
  }




}
