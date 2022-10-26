import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-sesiones',
  templateUrl: './view-sesiones.component.html',
  styleUrls: ['./view-sesiones.component.css']
})
export class ViewSesionesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public selectedDate: Date = new Date(2018, 1, 15);

}
