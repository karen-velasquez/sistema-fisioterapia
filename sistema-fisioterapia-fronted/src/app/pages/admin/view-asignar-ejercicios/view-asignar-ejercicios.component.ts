import { Component, OnInit, ViewChild, Input} from '@angular/core';
import { DropDownListComponent, MultiSelectComponent } from '@syncfusion/ej2-angular-dropdowns';
import { MatDialog } from '@angular/material/dialog';
import { ViewSeleccionTipoComponent } from '../view-seleccion-tipo/view-seleccion-tipo.component';
import { EjerciciosService } from 'src/app/services/ejercicios.service';
import { UserService } from 'src/app/services/user.service';
import { ViewCantidadSeriesComponent } from '../view-cantidad-series/view-cantidad-series.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-asignar-ejercicios',
  templateUrl: './view-asignar-ejercicios.component.html',
  styleUrls: ['./view-asignar-ejercicios.component.css']
})


export class ViewAsignarEjerciciosComponent implements OnInit {

/************************* CONFIGURANDO EL DROPDOWNLIST ********************************************* */ 
 /* Llamando la objeto que muestra la lista de Pacientes */
 @ViewChild('dropdownlistaPacientes')
 public dropDownListObject !: DropDownListComponent;
 public dataFields1: Object = {text:'username', value:'usuarioId'};
 public dropdownListFilterType: string='Contains';
 /*Objeto para obtener la lista de pacientes*/ 
 pacientes:any = []


 /******************* CONFIGURANDO EL MULTISELECTCOMPONENT DE EJERCICIOS ******************************** */ 
  @ViewChild('dropdownlistaEjercicios')
  public multicountryObj!: MultiSelectComponent;
  /* Obteniendo los datos del backend */
  ejercicios:any = []
  /* Configurando los dataFields */
  public dataFields: Object = {text: 'nombre', value: 'ejercicioId'}



  /* -*********** LA CREACION DEL CONSTRUCTOR *************** */
  constructor(private matdialog:MatDialog, private ejerciciosService:EjerciciosService, private userService:UserService) { }

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


    /* ----- COMIENZA LA CREACION DEL POPUP PARA OBTENER EL VALOR DE PARTE DEL CUERPO ----- */
    const popup = this.matdialog.open(ViewSeleccionTipoComponent, { disableClose: true });
    popup.afterClosed().subscribe(parte=>{
      /* ---- INGRESANDO LOS DATOS DE PACIENTES EN EL DROPDOWN ---- */
      this.ejerciciosService.listarEjercicios(parte).subscribe(
        (dato:any) =>{
          this.ejercicios = dato;
          console.log(dato);
        },
        (error) => {
          console.log(error);
        }
      )
    /* ---- FINALIZA: INGRESANDO LOS DATOS DE PACIENTES EN EL DROPDOWN ---- */
    })
  /* ----- FINALIZA: COMIENZA LA CREACION DEL POPUP PARA OBTENER EL VALOR DE PARTE DEL CUERPO ----- */
  }




 /************** OBTENIENDO LOS VALORES DEL MULTISELECT Y ENVIARLO A LA TABLA **************** */
  public obtenerEjercicios(): void {
    if(this.dropDownListObject.value != null && this.multicountryObj.value !=null ){
        var asignadosGuardar = [];
        console.log("a ver que tal");
        /* OBTENIENDO LOS EJERCICIOS SELECCIONADOS */
        for(let i = 0; i<this.ejercicios.length ; i++){
          for(let u=0 ; u<this.multicountryObj.value.length; u++ ){
              if(this.ejercicios[i]['ejercicioId'] == this.multicountryObj.value[u]){
                /* GUARDANDO LOS EJERCICIOS EN asignadosGuardar CON EL FORMATO JSON DE ASIGNADOS */
                asignadosGuardar.push(
                  {
                    "pacienteId": {
                        "usuarioId": this.dropDownListObject.value.toString()
                    },
                    "ejercicioId": this.ejercicios[i]
                    ,
                    "repeticiones": "12",
                    "series": "3"
                });
      
              }
          }
        }
        /* FINALIZA: OBTENIENDO LOS EJERCICIOS SELECCIONADOS */
        /* ---- ENVIANDO MENSAJE AL POP UP ----- */
        this.matdialog.open(
          ViewCantidadSeriesComponent,{data: asignadosGuardar}
          );
        /* ---- FINALIZA: ENVIANDO MENSAJE AL POP UP ----- */
    }else{
        /* -------- VERIFICANDO QUE SE HAYA ESCOGIDO A UN PACIENTE EN EL DROPDOWN ----*/
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Debes escoger a un paciente y por lo menos un ejercicio para asignar los ejercicios!!!',
        })
        /* -------- FINALIZA: VERIFICANDO QUE SE HAYA ESCOGIDO A UN PACIENTE EN EL DROPDOWN ----*/ 
    }




  }

}
