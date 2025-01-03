import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor() { }
  baseurl:String="http://192.168.200.224/"
  private http=inject(HttpClient);




  getassignment(payload:any){

   return this.http.post(this.baseurl+"gvkprod/v2/app/analytics/vehicle_assignment.php",JSON.stringify(payload));


  }

  refreshcount(){

    return this.http.get(this.baseurl+"gvkprod/pilotappchart.php");

  }

  


}
