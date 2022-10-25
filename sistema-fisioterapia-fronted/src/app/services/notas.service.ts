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
}
