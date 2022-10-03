import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class FisioterapeutaService {

  constructor(private httpClient: HttpClient) { }

  public adicionarFisioterapeuta(fisioterapeuta:any){
    return this.httpClient.post(`${baserUrl}/fisioterapeutas`,fisioterapeuta);
  }
}
