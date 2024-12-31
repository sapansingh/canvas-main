import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  constructor() { }

  private http=inject(HttpClient);

  baseurl:String="http://192.168.200.52:8080/";


  getpilotappchart(){


   return this.http.get(this.baseurl+"pilotchart");


  }




}
