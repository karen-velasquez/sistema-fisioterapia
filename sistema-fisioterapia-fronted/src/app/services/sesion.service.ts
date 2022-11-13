import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baserUrl from './helper';
import { map, catchError } from 'rxjs/operators';
import { Sesion } from 'src/app/pages/admin/model/Sesion'; 

@Injectable({
  providedIn: 'root'
})


export class SesionService {

  public urlSesion: string = `${baserUrl}/sesion/listar`;
  constructor(private httpClient: HttpClient) { }

  public guardarSesion(sesion:any){
    return this.httpClient.post(`${baserUrl}/sesion/`,sesion);
  }

  public listar(){
    return this.httpClient.get(`${baserUrl}/sesion/listar`);
  }


  public listarSesiones(){
    return this.httpClient.get<Sesion>(this.urlSesion)
    .pipe(
      map(
        (resp:any) => {
          return resp.map((sesion:any) => Sesion.sesionToJson(sesion))
        }
      )
    )
    
 
    
  }


  

  
}
