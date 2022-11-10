import { Component, OnInit } from '@angular/core';
import { EmailPasswordService } from 'src/app/services/email-password.service';
import { EmailValues } from './../../../models/email-values';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {


  public userName!: string;
  public email_values!: EmailValues;

  constructor(private snack:MatSnackBar, private emailPasswordService:EmailPasswordService) { }

  ngOnInit(): void {
  }

  formSubmit(){
    this.email_values = new EmailValues(this.userName);
    
    this.emailPasswordService.enviarEmail(this.email_values).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Enviado','Se envio el correo con exito','success');
      },(error) => {
        console.log(error);
        this.snack.open('Ha ocurrido un error en el sistema !!','Aceptar',{
          duration : 3000
        });
      }
    )



  }


}
