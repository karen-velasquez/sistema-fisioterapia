import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baserUrl from './helper';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubjec = new Subject<boolean>();

  constructor(private httpClient: HttpClient, private router:Router) { }

  //generamos el token
  public generateToken(loginData:any){
    return this.httpClient.post(`${baserUrl}/generate-token`,loginData);
  }

  //iniciando sesion y adicionando el token -- lo almacenaremos en el localstorage
  public loginUser(token:any){
    localStorage.setItem('token',token);
    return true;
  }

  public isLoggedIn(){
    let tokenStr = localStorage.getItem('token');
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null){
      return false;
    }else{
      return true;
    }
  }

  //cerrando sesion y eliminando el token del localstorage
  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['']);
    return true;
  }

  //obteniendo el token
  public getToken(){
    return localStorage.getItem('token');
  }

  public setUser(user:any){
    localStorage.setItem('user',JSON.stringify(user));
  }

  public getUser(){
    let userStr = localStorage.getItem('user');
    if(userStr != null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }

  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;

  }

  public getCurrentUser(){
    return this.httpClient.get(`${baserUrl}/actual-usuario`);
  }

}
