import { Component, OnInit, ViewChild} from '@angular/core';
import { DropDownListComponent, MultiSelectComponent } from '@syncfusion/ej2-angular-dropdowns';
import {
  EditService, ToolbarService, PageService, SaveEventArgs,
  FreezeService, DetailRowService, GridModel, DetailDataBoundEventArgs,
  EditSettingsModel, GridComponent, SelectionSettingsModel, ContextMenuItem,
  ContextMenuService, ContextMenuItemModel, ToolbarItems, CellEditArgs
} from '@syncfusion/ej2-angular-grids';
import { ComboBox } from '@syncfusion/ej2-angular-dropdowns';


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
  


  @ViewChild('grid')
  public gridObj!: GridComponent;



  public data!: object[];
  public datos: Object[]=[
    {
      OrderID: 10248, CustomerID: 'VINET', EmployeeID: 5, OrderDate: new Date(8364186e5),
      ShipName: 'Vins et alcools Chevalier', ShipCity: 'Reims', ShipAddress: '59 rue de l Abbaye',
      ShipRegion: 'CJ', ShipPostalCode: '51100', ShipCountry: 'France', Freight: 32.38, Verified: !0
  },
  {
      OrderID: 10249, CustomerID: 'TOMSP', EmployeeID: 6, OrderDate: new Date(836505e6),
      ShipName: 'Toms Spezialitäten', ShipCity: 'Münster', ShipAddress: 'Luisenstr. 48',
      ShipRegion: 'CJ', ShipPostalCode: '44087', ShipCountry: 'Germany', Freight: 11.61, Verified: !1
  }


  ];
  public country: string[] = ['France', 'Germany', 'Brazil', 'Belgium', 'Switzerland',
  'USA', 'Austria', 'Mexico', 'Austria', 'Venezuela'];

  @ViewChild('grid')
  public grid!: GridComponent;

    public editSettings!: EditSettingsModel;
    public toolbar!: ToolbarItems[];
    public orderIDRules!: object;
    public customerIDRules!: object;







  @ViewChild('dropdownlistaEjercicios')
  public multicountryObj!: MultiSelectComponent;







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
    this.data = this.datos;
      this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
      this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
  }


  
  public add():void{
    var objeto = this.gridObj.dataSource as object[];
    
    console.log(this.gridObj.dataSourceChanged as object[]);

    
    console.log(this.gridObj.dataSource as object[]);
    console.log("ddddddddddd");
    console.log(objeto.values);

    
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

  public imprimir(): void {
    var carros = [];
    carros.push({"name": "SO en español", "cool": true})
    carros.push({"name": "SO", "cool": true})

    console.log((JSON.stringify(carros)));
    /*let carro = {
      "color": "rojo",
      "typo": "cabrio",
    }

    let carro2 = {
      "color": "verde",
      "typo": "cabrio",
    }
    carros.push(carro);
    carros.push(carro2);*/

    console.log(carros);


    

  }

  public obtenervalores(): void {
  let obtenerFila = null;
    // Obtenemos la fila 2
  obtenerFila = document.getElementById("tabla");
  

  // Obtenemos los elementos td de la fila
  if(obtenerFila!=null){
    console.log("--------------------------");
    let elementosFila = obtenerFila.getElementsByTagName("td");
    for (let i=0; i<=4; i++) {
      console.log(elementosFila[i].innerHTML);
    }
    // Mostramos la colección HTML de la fila.
    console.log(elementosFila);
    console.log("--------------------------");
  }


    let obtenerDato = document.getElementById("serie");
    console.log("obtener datos");
    console.log(obtenerDato);
  }


  



  public ejercicioChange(): void {
    console.log('Este es el multiselect');
    console.log(this.multicountryObj.value);
    console.log('Este es el multiselectvalor');

    console.log(this.multicountryObj.value['0']);
    console.log(this.multicountryObj.value['1']);
    
    console.log('Este es el multiselectlenght');
    console.log(this.multicountryObj.value.length);


    
   /* if(this.multicountryObj.value)
        for(var d=0;d<this.multicountryObj.value.length;d++){
            if(pred)
            
                pred = pred.or("Id",'equal',this.multicountryObj.value[d]);
                
            else{
                pred=new Predicate("Id",'equal',this.multicountryObj.value[d]);
            }
            console.log(pred);

    }*/
  }








}
