import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangePassword } from './../../../models/change-password';
import { EmailPasswordService } from 'src/app/services/email-password.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  public password !: string;
  public confirmPassword!: string;
  public tokenPassword!: string;
  public change_password!: ChangePassword;
  



  constructor(private snack:MatSnackBar, 
    private emailPasswordService:EmailPasswordService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  formSubmit(){
    if(this.password !== this.confirmPassword){
      console.log("error las contrasenias no coinciden");
      return;
    }
    //this.tokenPassword = this.activatedRoute.snapshot.params['tokenPassword'];

    this.change_password = new ChangePassword(this.password, this.confirmPassword, this.tokenPassword);
    console.log(this.change_password);
    this.emailPasswordService.cambiarPassword(this.change_password).subscribe(
      (data) => {
        this.router.navigate(['']);
        Swal.fire('Cambiado','Se cambio la contraseña con exito!!!','success');
        
        
      },(error) => {
        console.log(error['error']);
        if(error.status === 404){
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error puede que el usuario no exista!!!',
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
