import { Component, OnInit, Inject } from '@angular/core';
import { highlightSearch } from '@syncfusion/ej2-angular-dropdowns';
import Chart from 'chart.js/auto'
import 'chartjs-adapter-date-fns';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { PlotSeguimientoService } from 'src/app/services/plot-seguimiento.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-plots',
  templateUrl: './view-plots.component.html',
  styleUrls: ['./view-plots.component.css']
})
export class ViewPlotsComponent implements OnInit {

  public timechart: any;


  public datos: any;

  public datosConverted: any;

  constructor(private snack:MatSnackBar, 
    private Ref: MatDialogRef<ViewPlotsComponent>,
    private plotSeguimientoService: PlotSeguimientoService,
    @Inject(MAT_DIALOG_DATA) public data:any
) { }

  ngOnInit(): void {
    this.datos= {datasets: this.data.datasetCoord};
  
    console.log("model: ");
    console.log(this.data);

    console.log("El data esssssssssssssssss: ");
    console.log(this.data.datasetCoord);


    /* Creando nuevamente el chart */
    this.timechart = new Chart("MyTimeChart", {
      type: 'line',
      data: this.datos,
      options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
              x: {
                  type: 'time',
                  time: {
                     unit: 'day'
                  },
                  title: {
                    display: true,
                    text: 'Fecha',
                  },
                  min: "2022-02-02",
                  max: "2022-11-12"
              },
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Porcentaje de aciertos diarios'
                },
                min: 0,
                max: 100
              }
          }
      }
  });
  this.timechart.update();

  }


  /* -----------------BOTON PARA CERRAR EL CHART------------------- */
  public closeChart(): void{
    let chartStatus = Chart.getChart("MyTimeChart"); // <canvas> id
    if (chartStatus != undefined) {
      //chartStatus?.destroy();
      chartStatus?.clear()
      console.log("entre al !undefined");
            //(or)
    // chartStatus.clear();
    }
    else{
      console.log("es undefined");
    }
    /* Enviando el valor para que lo obtenga el otro objeto */
    this.Ref.close();
  }


  /* -----------------BOTON PARA DESCARGAR EL CHART------------------- */
  public download(): void{
    const imageLink = document.createElement('a');
    const canvas = document.getElementById("MyTimeChart") as HTMLCanvasElement;
    if (canvas!=null){
      imageLink.download = 'canvas.png';
      imageLink.href = canvas.toDataURL("image/png", 1);
      //document.write('<img src=" '+imageLink+' "/>')
      //console.log(imageLink.href);
      imageLink.click();
    }
  }

  /* -----------------BOTON PARA FILTRAR LAS FECHAS------------------- */
  public filterDate(): void{
    console.log("el END value");
    console.log((<HTMLInputElement>document.getElementById('end')).value);

    //Obteniendo la fecha del Date
    var end = new Date(((<HTMLInputElement>document.getElementById('end')).value).toString());
    // Convirtiendo los datos a otro formato para actualizar el chart
    (this.timechart).config.options.scales.x.max = (end.toLocaleDateString('fr-CA')).toString();
    // Actualizando el chart
    this.timechart.update();


    var f1 = new Date(2022, 7, 31); //31 de diciembre de 2015
    var f2 = new Date(((<HTMLInputElement>document.getElementById('end')).value).toString());; //30 de noviembre de 2014
        
    if(f1 > f2){
        console.log("f1 > f2");
    }
    if(f1 < f2){
        console.log("f1 < f2");
    }
    
  }





  

}
