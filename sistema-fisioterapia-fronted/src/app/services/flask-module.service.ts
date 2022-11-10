import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FlaskModuleService {

  private BASE_URL = "http://127.0.0.1:5000";
  constructor(private httpClient:HttpClient) { 

  }

  public obtenerValor(){
    return this.httpClient.get(`${this.BASE_URL}/valor`);
  }

  public obtenerVideo(){
    return this.httpClient.get(`${this.BASE_URL}/video_feed`);
  }

}
