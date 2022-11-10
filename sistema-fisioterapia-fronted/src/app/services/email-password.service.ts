import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailValues } from '../models/email-values';
import { ChangePassword } from '../models/change-password';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class EmailPasswordService {

  constructor(private http:HttpClient) { }


  public enviarEmail(emailValues:EmailValues){
    return this.http.post(`${baserUrl}/email/send-html`,emailValues);
  }
  
  public cambiarPassword(changePassword:ChangePassword){
    return this.http.post(`${baserUrl}/email/change-password`,changePassword);
  }


}
