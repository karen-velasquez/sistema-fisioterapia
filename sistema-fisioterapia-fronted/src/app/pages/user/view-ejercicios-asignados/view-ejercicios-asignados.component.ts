import { Component, OnInit } from '@angular/core';
import { EjerciciosService } from 'src/app/services/ejercicios.service';
import { LoginService } from 'src/app/services/login.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-ejercicios-asignados',
  templateUrl: './view-ejercicios-asignados.component.html',
  styleUrls: ['./view-ejercicios-asignados.component.css']
})
export class ViewEjerciciosAsignadosComponent implements OnInit {

  /***************** LLAMANDO A LOS EJERCICIOS ASIGNADOS A CADA PACIENTE **********************/
  /*Objeto para obtener los asignados*/ 
  asignados:any = []
  /* Obteniendo el usuario para obtener el usuarioId */
  user:any;


  constructor(private ejerciciosService:EjerciciosService, private loginService:LoginService,
    private Ref: MatDialogRef<ViewEjerciciosAsignadosComponent>) { }


  ngOnInit(): void {
        /* ---- OBTENIENDO LOS EJERCICIOS ASIGNADOS A UN PACIENTE ---- */
        this.user = this.loginService.getUser();
        this.ejerciciosService.obtenerAsignadosPaciente(this.user.usuarioId).subscribe(
          (dato:any) =>{
            this.asignados = dato;
            console.log(dato);
          },
          (error) => {
            console.log(error);
          }
        )
        /* ---- FINALIZA: OBTENIENDO LOS EJERCICIOS ASIGNADOS A UN PACIENTE ---- */
  }



  public parteCuerpo(parteCuerpo:string): void{
    /* Enviando el valor para que lo obtenga el otro objeto */
    this.Ref.close(parteCuerpo);
  }


  public onCardClick(evt: MouseEvent){
    console.log(evt);
  }

  public obtenerEjercicios(item:any){
    this.Ref.close(item);
  }


}
