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

  constructor(private snack:MatSnackBar, 
    private plotSeguimientoService: PlotSeguimientoService,
    @Inject(MAT_DIALOG_DATA) public data:any
) { }

  ngOnInit(): void {
    this.datos= {datasets: this.data}
 
    this.timechart = new Chart("MyTimeChart", {
      type: 'line',
      data: this.datos,
      options: {
          scales: {
              x: {
                  type: 'time',
                  time: {
                     unit: 'day'
                  }
              },
              y: {
                beginAtZero: true
              }
          }
      }
  });
  }



  

}
