import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FisioterapeutaService } from 'src/app/services/fisioterapeuta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup-fisioterapeuta',
  templateUrl: './signup-fisioterapeuta.component.html',
  styleUrls: ['./signup-fisioterapeuta.component.css']
})
export class SignupFisioterapeutaComponent implements OnInit {

  public fisioterapeuta = {
    fisioterapeutaNick : '',
    fisioterapeutaIdPassword : '',
    fisioterapeutaNombres : '',
    fisioterapeutaApellidos : '',
    fisioterapeutaEdad : '',
  }

  constructor(private fisioterapeutaService:FisioterapeutaService, private snack:MatSnackBar) { }

  ngOnInit(): void {
  }


  formSubmit(){
    console.log(this.fisioterapeuta);
    if(this.fisioterapeuta.fisioterapeutaNick == '' || this.fisioterapeuta.fisioterapeutaIdPassword == ''){
      this.snack.open('El nombre de usuario es requerido !!','Aceptar',{
        duration : 3000,
        verticalPosition : 'top',
        horizontalPosition : 'right'
      });
      return;
    }


    this.fisioterapeutaService.adicionarFisioterapeuta(this.fisioterapeuta).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Usuario guardado','Usuario registrado con exito en el sistema','success');
      },(error) => {
        console.log(error);
        this.snack.open('Ha ocurrido un error en el sistema !!','Aceptar',{
          duration : 3000
        });
      }
    )


  }

  

}
