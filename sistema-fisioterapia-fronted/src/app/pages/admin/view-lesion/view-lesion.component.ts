import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

import { UserService } from 'src/app/services/user.service';

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
    pacienteIdUsuarioId :''
  }
 

  constructor(private _ngZone: NgZone, private listarPaciente:UserService) {}


  ngOnInit(): void {
    this.listarPaciente.listaPacientes().subscribe(
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
    this.lesion.pacienteIdUsuarioId = (this.dropDownListObject.value).toString();
    return;
  }




}
