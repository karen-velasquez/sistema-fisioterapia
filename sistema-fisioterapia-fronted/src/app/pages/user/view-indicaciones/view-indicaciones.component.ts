import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EjerciciosService } from 'src/app/services/ejercicios.service';
import { ViewEjerciciosAsignadosComponent } from '../view-ejercicios-asignados/view-ejercicios-asignados.component';

@Component({
  selector: 'app-view-indicaciones',
  templateUrl: './view-indicaciones.component.html',
  styleUrls: ['./view-indicaciones.component.css']
})
export class ViewIndicacionesComponent implements OnInit {
  /* ******************** CREANDO EL OBJETO PARA OBTENER LOS DATOS*************************** */
  ejercicioEscogido = {
    asignadoId: '',
    pacienteId: {
        usuarioId: ''
    },
    ejercicioId: {
        ejercicioId: '',
        nombre: '',
        tipo: '',
        parteCuerpo: '',
        descripcion: '',
        link_imagen: '',
        posicionCamaraId: {
            posicionCamaraId: '',
            descripcion: '',
            imagenUrl: ''
        }
    },
    repeticiones: 12,
    series: 3
};

  constructor(private matdialog:MatDialog) { }

  ngOnInit(): void {
    /* ----- COMIENZA LA CREACION DEL POPUP PARA EL EJERCICIO A REALIZAR ----- */
    const popup = this.matdialog.open(ViewEjerciciosAsignadosComponent, { disableClose: true });
    popup.afterClosed().subscribe(escogido=>{
      /* ---- OBTENIENDO EL VALOR ---- */
      this.ejercicioEscogido = escogido;
      console.log(this.ejercicioEscogido);
    /* ---- FINALIZA:  COMIENZA LA CREACION DEL POPUP PARA EL EJERCICIO A REALIZAR ---- */
    })
  }


  public onClick(){
    console.log("Siguiente");
  }

}
