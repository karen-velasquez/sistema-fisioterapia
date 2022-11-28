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


  public enviarEmail(username:String){
    return this.http.get(`${baserUrl}/email/send_html/${username}`);
  }
  
  public cambiarPassword(changePassword:ChangePassword){
    return this.http.post(`${baserUrl}/email/change-password`,changePassword);
  }


}
