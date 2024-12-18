import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor() { }

  private http=inject(HttpClient);
  baseurl:String="http://192.168.200.52:8080/";

getdevicedata(){
  return this.http.get(this.baseurl+"getdevicetype");
}

getbrandname(devicetype:string){
  return this.http.get(this.baseurl+"getbrand?getpara="+devicetype);

}
  addassets(formdata:any[]){

    return this.http.post(this.baseurl+"addassets",formdata);

  }

  getassetdata(): Observable<assetsdataapi[]>{

    return this.http.get<assetsdataapi[]>(this.baseurl+"getassets");
  }

}
export interface assetsdataapi {
  id:String,
 deviceType:String,
 brandName:String,
 modelName:String,
 invoiceno	:String,
 serialNumber:String,
 assetsreciveddate:String,
 specification:String,
 warrantydate:String,
 imeino1:String,
 imeino2:String,
 assetTag:String
 }