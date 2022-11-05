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
  @ViewChild('dropdownlistaPacientes')
  public dropDownListObject !: DropDownListComponent;

  public dataFields: Object = {text:'username', value:'usuarioId'};
  public dropdownListFilterType: string='Contains';

  /*lista de pacientes MODIFICAR a una mejor practica de angular*/ 
  pacientes:any = [
  ]

  /*creando el objeto lesion*/ 
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




  formSubmit(){
    console.log('click en login');

    this.lesion.pacienteId.usuarioId = (this.dropDownListObject.value).toString();
    /*-------------Revisando que no haya valores vacios y nulls---------------*/ 
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

    if(this.lesion.pacienteId.usuarioId.trim() == '' || this.lesion.pacienteId.usuarioId.trim() == null){
      this.snack.open('Escoge un paciente!!','Aceptar',{
        duration:3000
      })
      return;
    }
    /*----------------------------------------------------------------------------*/ 


    this.lesionService.guardarLesiones(this.lesion).subscribe(
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
    
  }




}
