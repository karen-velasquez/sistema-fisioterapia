import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  EditService, ToolbarService, PageService, SaveEventArgs,
  FreezeService, DetailRowService, GridModel, DetailDataBoundEventArgs,
  EditSettingsModel, GridComponent, SelectionSettingsModel, ContextMenuItem,
  ContextMenuService, ContextMenuItemModel, ToolbarItems,  IEditCell, CellEditArgs
} from '@syncfusion/ej2-angular-grids';
import { Query } from '@syncfusion/ej2-data';
import { EjerciciosService } from 'src/app/services/ejercicios.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-view-cantidad-series',
  templateUrl: './view-cantidad-series.component.html',
  styleUrls: ['./view-cantidad-series.component.css']
})
export class ViewCantidadSeriesComponent implements OnInit {

  /************************* CONFIGURANDO LA TABLA DE EJERCICIOS ********************************************* */ 
 /* Llamando al objeto tabla o grid */
  @ViewChild('grid')
  public gridObj!: GridComponent;
  /* Configurando el data que estara en la tabla */
  public dato!: object[];

  /* EditSettings model de la tabla */
  public editSettings!: EditSettingsModel;
 /* Toolbar model de la tabla */
  public toolbar!: ToolbarItems[];
  /* HAY QUE VER QUE ES ORDER ID RULES*/
  public orderIDRules!: object;
  public customerIDRules!: object;
  /*Creando los parametro de repeticion */
  public repeticionParams!: IEditCell;
  repeticiones: { [key: string]: Object }[] = [
    { repeticion: '12'},
    { repeticion: '15' }
  ];
   /*Creando los parametro de series */
   public serieParams!: IEditCell;
   series: { [key: string]: Object }[] = [
     { series: '3'},
     { series: '4' }
   ];



  constructor(@Inject(MAT_DIALOG_DATA) public data:any, 
  private ejerciciosService:EjerciciosService, 
  private snack:MatSnackBar,
  private Ref: MatDialogRef<ViewCantidadSeriesComponent> 
  ) { }

  ngOnInit(): void {
    /*----- CONFIGURANDO LOS ATRIBUTOS DE LA TABLA GRID ---- */
    this.dato = this.data;
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
    this.toolbar = [ 'Edit', 'Update', 'Cancel'];

    /*----- FINALIZA: CONFIGURANDO LOS ATRIBUTOS DE LA TABLA GRID ---- */
    /*---- CONFIGURANDO LOS PARAMETROS DE REPETICIONES ---- */
    this.repeticionParams = {
      params: {
          query: new Query(),
          dataSource: this.repeticiones,
          fields: { value: 'repeticion', text: 'repeticion' },
          allowFiltering: true
      }
    };
    /*---- FINALIZA: CONFIGURANDO LOS PARAMETROS DE REPETICIONES ---- */
    /*---- CONFIGURANDO LOS PARAMETROS DE SERIES ---- */
    this.serieParams = {
      params: {
          query: new Query(),
          dataSource: this.series,
          fields: { value: 'series', text: 'series' },
          allowFiltering: true
      }
    };
    /*---- FINALIZA: CONFIGURANDO LOS PARAMETROS DE SERIES ---- */
  }


  public guardar():void{
    /* ---- GUARDAR EJERCICIOS ASIGNADOS ---- */
    this.ejerciciosService.guardarAsignados(this.gridObj.dataSource as object[]).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Ejercicios Guardados','Ejercicios asignados con exito en el sistema','success');
        this.Ref.close();
      },(error) => {
        console.log(error);
        this.snack.open('Ha ocurrido un error en el sistema !!','Aceptar',{
          duration : 3000
        });
      }
    )
    /* ---- GUARDAR EJERCICIOS ASIGNADOS ---- */
  }

  

}
