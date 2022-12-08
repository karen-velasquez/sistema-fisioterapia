import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  public guardarUsuario(user:any){
    return this.httpClient.post(`${baserUrl}/usuarios/`,user);
  }

  public listaPacientes(){
    return this.httpClient.get(`${baserUrl}/usuarios/listar`)
  }

  public guardarFisioterapeuta(user:any){
    return this.httpClient.post(`${baserUrl}/usuarios/fisioterapeuta/`,user);
  }

}