import { Component, OnInit, ViewChild} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-view-crear-usuario',
  templateUrl: './view-crear-usuario.component.html',
  styleUrls: ['./view-crear-usuario.component.css']
})
export class ViewCrearUsuarioComponent implements OnInit {

  public format: string = "dd/MM/yyyy";

  /* Fecha minima y maxima a colocar se pondra que el rango sea entre 10 a 40 anios */
  minDate: Date;
  maxDate: Date;

  /*---- Creando el objeto de usuario para guardarlo en la Base de Datos */
  public user = {
    username : '',
    password : '',
    nombres : '',
    apellidos : '',
    correo : '',
    fechaNac : ''
  }

  constructor(private userService:UserService,private snack:MatSnackBar) { 
    // colocando el minimo y maximo de edad que debe tener por lo menos 10 años y maximo 40 años
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 40, 0, 0);
    this.maxDate = new Date(currentYear - 10, 0, 0);

  }

  ngOnInit(): void {
  }


  onChange(args:any) {
    console.log(args);
  }




  formSubmit(){
    /* ---- VERIFICANDO QUE LOS ESPACIOS NO SON BLANCOS ---- */
    if(this.user.username == '' || this.user.username == null){
      this.snack.open('El nombre de usuario es requerido !!','Aceptar',{
        duration : 3000,
        verticalPosition : 'top',
        horizontalPosition : 'right'
      });

      return;
    }
    if(this.user.password == '' || this.user.password== null){
      this.snack.open('La contraseña es requerida !!','Aceptar',{
        duration : 3000,
        verticalPosition : 'top',
        horizontalPosition : 'right'
      });
      return;
    }
    if(this.user.nombres == '' || this.user.nombres == null
    || this.user.apellidos == '' || this.user.apellidos == null){
      this.snack.open('Los nombre y apellidos son requeridos !!','Aceptar',{
        duration : 3000,
        verticalPosition : 'top',
        horizontalPosition : 'right'
      });
      return;

    }
    if(this.user.fechaNac == '' || this.user.fechaNac == null){
      this.snack.open('La fecha de nacimiento es requerida !!','Aceptar',{
        duration : 3000,
        verticalPosition : 'top',
        horizontalPosition : 'right'
      });
      return;

    }
    if(this.user.correo == '' || this.user.correo == null ){
      this.snack.open('El correo es requerido !!','Aceptar',{
        duration : 3000,
        verticalPosition : 'top',
        horizontalPosition : 'right'
      });

      return;
    }
    /* ------- FINALIZA: VERIFICANDO QUE LOS ESPACIOS NO SON BLANCOS ------ */

    /* Cambiando la configuracion de la fecha */
    var today = new Date(this.user.fechaNac);
    this.user.fechaNac =  (today.toLocaleDateString('en-GB')).toString();



    
    /* ---------------- GUARDANDO LOS DATOS EN LA BDD --------------- */
    this.userService.guardarUsuario(this.user).subscribe(
      (data) => {
        console.log(data);
        location.reload()
        Swal.fire('Usuario guardado','Usuario registrado con exito en el sistema','success');
        
      },(error) => {
        console.log(error);
        /*---- Error 500 es error al guardar los datos, posiblemente nombre de usuario repetido ---- */
        if(error.status === 500){
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ya existe un paciente con ese Nombre de Usuario!!!',
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
     /* ------------- FINALIZA: GUARDANDO LOS DATOS EN LA BDD ------------- */
  }

}
