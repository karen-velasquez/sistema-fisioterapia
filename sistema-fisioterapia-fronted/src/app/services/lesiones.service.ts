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
}
