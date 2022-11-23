import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /* Objeto para el Login username y password */
  loginData = {
    "username":'',
    "password":''
  }

  constructor(private snack:MatSnackBar, private loginService:LoginService,private router:Router) { }


    ngOnInit(): void {
   
    }


  formSubmit(){
    /* ---- Verificando que no se ingresen campos vacios ---- */
    if(this.loginData.username.trim() == '' || this.loginData.username.trim() == null){
      this.snack.open('El nombre de usuario es requerido !!','Aceptar',{
        duration:3000
      })
      return;
    }

    if(this.loginData.password.trim() == '' || this.loginData.password.trim() == null){
      this.snack.open('La contraseña es requerida !!','Aceptar',{
        duration:3000
      })
      return;
    }


    /* ---- Generando el token para ingresar a la pagina web ----  */
    this.loginService.generateToken(this.loginData).subscribe(
      (data:any) => {
        /* Obteniendo el usuario actual */
        console.log(data);
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe((user:any) => {
          
          this.loginService.setUser(user);
          console.log(user);
          

          if(this.loginService.getUserRole() == 'FISIOTERAPEUTA'){
              //dashboard admin
              //window.location.href = '/admin';
            this.router.navigate(['admin']);
            this.loginService.loginStatusSubjec.next(true);
          }

          else if(this.loginService.getUserRole() == 'ADMINISTRADOR'){
              //user dashboard
              //window.location.href = '/user-dashboard';
            this.router.navigate(['user']);
            this.loginService.loginStatusSubjec.next(true);
          }
          else{
            this.loginService.logout();
          }



        })
      },(error) => {
        console.log(error);
        /*this.snack.open('Detalles inválidos , vuelva a intentar !!','Aceptar',{
          duration:3000
        })*/
        if(error.status === 500){
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Las credenciales ingresadas son inválidas!!!',
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


  }

}
