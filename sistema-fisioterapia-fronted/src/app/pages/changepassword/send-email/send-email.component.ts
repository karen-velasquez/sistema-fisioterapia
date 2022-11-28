import { Component, OnInit } from '@angular/core';
import { EmailPasswordService } from 'src/app/services/email-password.service';
import { EmailValues } from './../../../models/email-values';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {


  public userName!: string;
  public email_values!: EmailValues;

  constructor(private snack:MatSnackBar, private emailPasswordService:EmailPasswordService,private router: Router,) { }

  ngOnInit(): void {
  }

  formSubmit(){
    this.emailPasswordService.enviarEmail(this.userName).subscribe(
      (data) => {
        Swal.fire('Enviado','Se envio el correo con exito','success');
        this.router.navigate(['changePassword']);
      },(error) => {
        console.log(error);
        if(error.status === 404){
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error puede que el usuario no exista!!!',
          })
        }
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



  }


}
