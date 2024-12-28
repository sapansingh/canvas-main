import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { serials } from '../inventory/inventoryissuereceived/inventoryissuereceived.component';

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

  getserial():Observable<serials[]>{
    return this.http.get<serials[]>(this.baseurl+"getserials");
  }

  getassetsissue():Observable<assetsissuedetails[]>{
    return this.http.get<assetsissuedetails[]>(this.baseurl+"assetsissuedetails");
  }
  getdetaildata(Serials:String){
    return this.http.get(this.baseurl+"serialdetails?serails="+Serials);
  }

  receivedget(formdata:any){
    return this.http.get(this.baseurl+"received?serialnumber="+formdata.serialnumber+"&receiveddate="+formdata.receiveddate+"&receivername="+formdata.receivername+"&assetsstatus="+formdata.assetsstatus+"&remark="+formdata.remark);
  }

  getassetsdetails(data:any){
    return this.http.post(this.baseurl+"issue",data);
  }


}



export interface assetsissuedetails{
  id: String,
  serialnumber: String,
  receivername: String,
  devicename: String,
  brandname: String,
  modelname: String ,
  department: String,
  designation: String,
  gidno: String,
  name: String,
  issuedate: String,
  receiveddate: String,
  assetsstatus: String,
  remark: String
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