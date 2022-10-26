import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-view-asignar-ejercicios',
  templateUrl: './view-asignar-ejercicios.component.html',
  styleUrls: ['./view-asignar-ejercicios.component.css']
})


export class ViewAsignarEjerciciosComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'}
  ];


  options = [
    {option: 'raton'},
    {option: 'gato'}
  ];


  public foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

  title = 'example'


  public dataFields: Object = {text: 'Name', value: 'Id'}
  public localData : Object [] = [
    { Name: 'Andres Garrison', Id: '1', Image: 'https://t1.pb.ltmcdn.com/es/posts/2/4/2/que_piensa_una_persona_cuando_dejas_de_buscarla_5242_orig.jpg'},
    { Name: 'Andres Gfdsfsan', Id: '2', Image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYYdEFd-c3rz7Lj_PFj-Bz9iO-S40ZZM4Z3w&usqp=CAU'},
    { Name: 'Andres Grewqrqn', Id: '3', Image: 'https://www.freepik.es/foto-gratis/apuesto-hombre-apuntando-lateral_1184718.htm#query=persona%20senalando&position=1&from_view=keyword'},
    { Name: 'Aiuikuyson', Id: '4', Image: 'https://www.freepik.es/foto-gratis/apuesto-hombre-apuntando-lateral_1184718.htm#query=persona%20senalando&position=1&from_view=keyword'},
    { Name: 'Anzbczvcxon', Id: '5', Image: 'https://www.freepik.es/foto-gratis/apuesto-hombre-apuntando-lateral_1184718.htm#query=persona%20senalando&position=1&from_view=keyword'},

  ];




}
