import { Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { ApiserviceService } from '../../service/apiservice.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-addinventory',
  standalone: true,
  imports: [MatCardModule,MatInputModule,MatFormFieldModule,MatSelectModule,CommonModule,MatButtonModule,MatOptionModule,FormsModule],
  templateUrl: './addinventory.component.html',
  styleUrl: './addinventory.component.css'
})
export class AddinventoryComponent {


  private serviceap=inject(ApiserviceService);
  dtype:any=[];
  brand:any=[];
  ngOnInit(): void {
   
   this.serviceap.getdevicedata().subscribe((res:any)=>{
    this.dtype=res.map((device:any)=>device.device_type);
   });
  }


  onBrand(devicetype:string){
  this.serviceap.getbrandname(devicetype).subscribe((res:any)=>{
      this.brand=res.map((brandname:any)=>brandname.brandname);
  });
  }

 formdata:any={
  deviceType:"",
  brandName:"",
  modelName:"",
  serialNumber:"",
  specification:"",
  assetTag:"",
  invoiceno:"",
  assetsreciveddate:"",
  imeino1:"",
  imeino2:"",
  warrantydate:""  
 }




 addassets(){
  this.serviceap.addassets(this.formdata).subscribe((res:any)=>{
   if(res){
    alert("assets added");
    this.formdata={
      deviceType:"",
      brandName:"",
      modelName:"",
      serialNumber:"",
      specification:"",
      assetTag:"",
      invoiceno:"",
      assetsreciveddate:"",
      imeino1:"",
      imeino2:"",
      warrantydate:""  
     }
     }

  });
  
 }




}
