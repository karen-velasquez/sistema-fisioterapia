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
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
  }

  formSubmit(){
    if(this.password !== this.confirmPassword){
      console.log("error las contrasenias no coinciden");
      return;
    }
    this.tokenPassword = this.activatedRoute.snapshot.params['tokenPassword'];
    this.change_password = new ChangePassword(this.password, this.confirmPassword, this.tokenPassword);
    console.log(this.change_password);
    this.emailPasswordService.cambiarPassword(this.change_password).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Cambiado','Se cambio la contrase;a con exito','success');
      },(error) => {
        console.log(error);
        this.snack.open('Ha ocurrido un error en el sistema !!','Aceptar',{
          duration : 3000
        });
      }
    )


  }

}
