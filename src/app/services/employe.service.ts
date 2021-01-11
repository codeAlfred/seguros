import { Injectable } from '@angular/core';
//http client para hacer las peticiones
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  //https://api.reniec.cloud/dni/47395510
  
  API_URI = 'https://api.reniec.cloud';
  PROXI_URI = 'https://cors-anywhere.herokuapp.com';

  constructor( private http: HttpClient) { }

  //obtener solo un empleado almacenado
  getEmploye(dni: string){
    return this.http.get(`${this.PROXI_URI}/${this.API_URI}/dni/${dni}`)
  }
}
