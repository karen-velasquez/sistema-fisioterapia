import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-pacientes',
  templateUrl: './view-pacientes.component.html',
  styleUrls: ['./view-pacientes.component.css']
})
export class ViewPacientesComponent implements OnInit {

  pacientes = [
    {
      pacienteId : 1,
      nombre : 'Kimmy'
    },
    {
      pacienteId : 1,
      nombre : 'Kimmy'
    },
    {
      pacienteId : 1,
      nombre : 'Kimmy'
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
