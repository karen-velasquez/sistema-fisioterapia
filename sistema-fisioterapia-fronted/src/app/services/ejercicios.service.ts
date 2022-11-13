import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class EjerciciosService {

  constructor(private httpClient: HttpClient) { }


  /* listando los ejercicios de la BDD */
  public listarEjercicios(parte:string){
    return this.httpClient.get(`${baserUrl}/ejercicio/listar/${parte}`)
  }

  /* Guardar los ejercicios que se estan asignando */
  public guardarAsignados(asignados:any){
    return this.httpClient.post(`${baserUrl}/asignado/guardarAsignados`,asignados)
  }


  /* Obtener los ejercicios asignados a un paciente */
   public obtenerAsignadosPaciente(paciente:number){
    return this.httpClient.get(`${baserUrl}/asignado/paciente/${paciente}`)
  }



}
