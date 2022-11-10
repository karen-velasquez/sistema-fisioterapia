import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  constructor(private http:HttpClient) { }

  public listaNotas(){
    return this.http.get(`${baserUrl}/notas/`)
  }

  
  public guardarNota(nota:any){
    return this.http.post(`${baserUrl}/nota_sesion/`,nota)
  }
  

  public guardarvariasNota(notas:any){
    return this.http.post(`${baserUrl}/nota_sesion/todos`,notas)
  }

}
