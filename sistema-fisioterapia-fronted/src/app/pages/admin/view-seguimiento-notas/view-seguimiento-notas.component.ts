import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-seguimiento-notas',
  templateUrl: './view-seguimiento-notas.component.html',
  styleUrls: ['./view-seguimiento-notas.component.css']
})
export class ViewSeguimientoNotasComponent implements OnInit {

  notas = [
    {
      fecha: '27/02/2022',
      hora: '1:00PM',
      nota: 'bajo la inflamacion'
    },
    {
      fecha: '29/02/2022',
      hora: '2:00PM',
      nota: 'aun esta hinchado debe aplicarse hielo'
    },
    {
      fecha: '27/02/2022',
      hora: '3:00PM',
      nota: 'esta listo para los ejercicios d '
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
