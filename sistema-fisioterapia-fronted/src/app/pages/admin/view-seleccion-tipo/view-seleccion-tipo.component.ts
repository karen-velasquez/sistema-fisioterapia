import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-seleccion-tipo',
  templateUrl: './view-seleccion-tipo.component.html',
  styleUrls: ['./view-seleccion-tipo.component.css']
})
export class ViewSeleccionTipoComponent implements OnInit {

/* Creando un objeto de referencia para enviar los datos */
  constructor(private Ref: MatDialogRef<ViewSeleccionTipoComponent>) { }

  ngOnInit(): void {
  }


  public parteCuerpo(parteCuerpo:string): void{
    /* Enviando el valor para que lo obtenga el otro objeto */
    this.Ref.close(parteCuerpo);
  }

}
