import { Component, OnInit, Inject } from '@angular/core';
import { highlightSearch } from '@syncfusion/ej2-angular-dropdowns';
import Chart from 'chart.js/auto'
import 'chartjs-adapter-date-fns';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { PlotSeguimientoService } from 'src/app/services/plot-seguimiento.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import jspdf from 'jspdf';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-view-plots',
  templateUrl: './view-plots.component.html',
  styleUrls: ['./view-plots.component.css']
})
export class ViewPlotsComponent implements OnInit {

  //Time chart - chart donde se coloca todos los datos
  public timechart: any;

  //Objeto de datos que se coloca en el timechart
  public datos: any;

  public minDate!: Date;
  public maxDate!: Date;


  //Colocando los valores en el input del date
  public startDate = new FormControl(new Date());
  public endDate = new FormControl(new Date());

  //Obteniendo el nombre del usuario
  user:any;


  constructor(private snack:MatSnackBar, 
    private Ref: MatDialogRef<ViewPlotsComponent>,
    private plotSeguimientoService: PlotSeguimientoService,
    @Inject(MAT_DIALOG_DATA) public data:any
) { }

  ngOnInit(): void {
    this.datos= {datasets: this.data.datasetCoord};

    this.minDate = this.data.min;
    this.maxDate = this.data.max;

    this.startDate = new FormControl(new Date(this.data.min));
    this.endDate = new FormControl(new Date(this.data.max));

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
                  min: this.data.min,
                  max: this.data.max
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
  public downloadImage(): void{
    this.changeColor();
    const imageLink = document.createElement('a');
    const canvas = document.getElementById("MyTimeChart") as HTMLCanvasElement;
    if (canvas!=null){
      imageLink.download = 'EjerciciosRealizados.png';
      imageLink.href = canvas.toDataURL("image/png", 1);
      //document.write('<img src=" '+imageLink+' "/>')
      //console.log(imageLink.href);
      imageLink.click();
    }
  }

  /* -----------------BOTON PARA DESCARGAR EL CHART------------------- */
  public downloadPdf(): void{
    this.changeColor();

    let canvas = document.getElementById("MyTimeChart") as HTMLCanvasElement;
    if (canvas!=null){

      //create image
      const pdfChartImage = canvas.toDataURL('image/jpeg', 1.0);
      
      let pdf = new jspdf('landscape');
      pdf.setFontSize(20);
      pdf.addImage(pdfChartImage, 'JPEG', 15, 15, 280, 150);
      pdf.save("InformeEjerciciosRealizados");

      
    }
  }



  /* -----------------CAMBIANDO EL BACKGROUND DEL FONDO PARA DESCARGARLO------------------- */
  public changeColor(): void{
    let canvas = document.getElementById("MyTimeChart") as HTMLCanvasElement;
    if (canvas!=null){
      // get the canvas 2d context
      var ctx = canvas.getContext('2d');
      if (ctx!=null){
      // set the ctx to draw beneath your current content
      ctx.globalCompositeOperation = 'destination-over';
      // set the fill color to white
      ctx.fillStyle = 'white';
      // apply fill starting from point (0,0) to point (canvas.width,canvas.height)
      // these two points are the top left and the bottom right of the canvas
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

    

    }
  }




  /* -----------------BOTON PARA FILTRAR LAS FECHAS------------------- */
  public filterDateEnd(): void{
    //Obteniendo la fecha del Date
    var end = new Date(((<HTMLInputElement>document.getElementById('end')).value).toString());
    
    // Convirtiendo los datos a otro formato para actualizar el chart
    (this.timechart).config.options.scales.x.max = (end.toLocaleDateString('fr-CA')).toString();


    // Actualizando el chart
    this.timechart.update();
  }


    /* -----------------BOTON PARA FILTRAR LAS FECHAS------------------- */
    public filterDateStart(): void{
      //Obteniendo la fecha del Date
      var start = new Date(((<HTMLInputElement>document.getElementById('start')).value).toString());
      // Convirtiendo los datos a otro formato para actualizar el chart
      (this.timechart).config.options.scales.x.min = (start.toLocaleDateString('fr-CA')).toString();

      // Actualizando el chart
      this.timechart.update();
    }
  




  

}
