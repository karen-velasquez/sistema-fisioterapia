import { Component, OnInit } from '@angular/core';
import { FlaskModuleService } from 'src/app/services/flask-module.service';
import {Router, NavigationEnd,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-view-realizar-ejercicios',
  templateUrl: './view-realizar-ejercicios.component.html',
  styleUrls: ['./view-realizar-ejercicios.component.css']
})
export class ViewRealizarEjerciciosComponent implements OnInit {

  public id: any;
  thumbnail: any;
  public superball!: string ;

  constructor(private flaskModuleService:FlaskModuleService,
    private router: Router,
     private activatedRoute: ActivatedRoute) { }


  ngOnInit() {
    this.pollData();
  }

  pollData () {
    this.id = setInterval(() => {
      this.superball = 'http://127.0.0.1:5000/video_feed';
      this.flaskModuleService.obtenerValor().subscribe(
        (data:any) =>{
          console.log(data);
          
        },
        (error) => {
          console.log(error);
        }
      )
    }, 1000);
  }

  refreshComponent(){
    this.router.navigate([this.router.url])
 }
  
  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
      location.reload();
      this.refreshComponent();
      
      
    }
  }

}
