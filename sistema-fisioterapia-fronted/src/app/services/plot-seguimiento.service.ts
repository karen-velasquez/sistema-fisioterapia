import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class PlotSeguimientoService {

  constructor(private http:HttpClient) { }

  //Se obtiene la lista de codigos de asignados segun el nombre de usuario del paciente
  public listaCodigoAsignadosPaciente(paciente: String){
    return this.http.get(`${baserUrl}/asignado/codigo/${paciente}`)
  }


  //Se obtiene la lista de codigos de asignados segun el nombre de usuario del paciente
  public listaCodigoAsignadosPacientebyId(paciente_id: String){
    return this.http.get(`${baserUrl}/asignado/codigo/byId/${paciente_id}`)
  }



  //Se obtiene el cumplimiento
  public obtenerCumplimientosAsignado(paciente: String, asignado: String){
    return this.http.get(`${baserUrl}/cumplimiento/model/${paciente}/${asignado}`)
  }


  //Se obtiene el cumplimiento mediante codigo
  public obtenerCumplimientosAsignadobyId(paciente_id: String, asignado_id: String){
    return this.http.get(`${baserUrl}/cumplimiento/model/byId/${paciente_id}/${asignado_id}`)
  }



}
