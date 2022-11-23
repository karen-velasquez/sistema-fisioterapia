import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LesionesService {

  constructor(private httpClient: HttpClient) { }

  public guardarLesion(lesion:any){
    return this.httpClient.post(`${baserUrl}/lesion/les`,lesion);
  }

  /* Listando las lesiones de la BDD */
  public listarLesionesPaciente(paciente_id:String){
    return this.httpClient.get(`${baserUrl}/lesion/listar/${paciente_id}`);
  }

}
