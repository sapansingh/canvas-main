import { AfterViewInit, Component, inject, ViewChild, OnInit, ChangeDetectionStrategy, Injectable, Inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ApiserviceService, assetsdataapi, assetsissuedetails } from '../../service/apiservice.service';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent} from '@angular/material/dialog';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {debounceTime, map, startWith} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
@Component({
  selector: 'app-inventoryissuereceived',
  standalone: true,
   imports: [
     MatTableModule,
     MatPaginatorModule,
     MatFormFieldModule,
     MatIconModule,
     MatInputModule,
     FormsModule,
     MatButtonModule,
     MatCardModule,
     MatAutocompleteModule 
   ],
  templateUrl: './inventoryissuereceived.component.html',
  styleUrl: './inventoryissuereceived.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryissuereceivedComponent {
  readonly dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }
  recived(data:String) {
    
    this.dialog.open(Issueassets,{data:{name:data}});
  }
  displayedColumns: string[] = ['id', 'serialnumber', 'receivername', 'devicename', 'brandname', 'modelname', 'department', 'designation', 'gidno', 'name', 'issuedate', 'receiveddate','assetsstatus','Action'];
  dataSource = new MatTableDataSource<assetsissuedetails>([]);// Initialize with an empty array

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  private apiservice = inject(ApiserviceService);
tabledata:any;
private interval: any;
ngOnInit(): void {
 
  this.loadtabledata();

}



  ngOnDestroy(): void {
    // Clear interval when the component is destroyed to prevent memory leaks
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  loadtabledata(){
    this.apiservice.getassetsissue().subscribe((assets: assetsissuedetails[]) => {
      this.dataSource.data = assets;  // Dynamically populate the table with the fetched data
    });
  }


  exportToCSV(): void {
    const header = Object.keys(this.dataSource.data[0]).join(',') + '\n';
    const rows = this.dataSource.data.map(row => {
      return Object.values(row).join(',');
    }).join('\n');

    const csvContent = header + rows;

    const blob = new Blob([csvContent], { type: 'text/csv' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "Issue and Received data" + '.csv';
    link.click();
  }



  // Helper function to convert JSON to CSV
  private convertJsonToCsv(json: any[]): string {
    const header = Object.keys(json[0]);
    const rows = json.map(item => header.map(field => item[field]).join(','));
    return [header.join(','), ...rows].join('\n');
  
}
 
  
  

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
export interface User {
  name: string;
}

export interface serials {
  model_name: string,
  serial_number: string,
  device_type: string
}
@Component({
  selector: 'dialog',
  templateUrl: 'dialog.html',
  styleUrl: './inventoryissuereceived.component.css',
  standalone: true,
  imports: [CommonModule,FormsModule,MatFormFieldModule,MatInputModule,MatAutocompleteModule,ReactiveFormsModule,AsyncPipe,MatAutocompleteModule, MatDialogContent, MatDialogActions, MatDialogClose,MatCardModule,MatInputModule,MatFormFieldModule,MatSelectModule,CommonModule,MatButtonModule,MatOptionModule,FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogElementsExampleDialog implements OnInit {
  private serv = inject(ApiserviceService);
  myControl = new FormControl<string | serials>('');
  filteredOptions!: Observable<serials[]>;
  serialsno: serials[] = [];
  assetdata:any=[];
   formdata:any={
      serialnumber: "",
      receivername: "",
      devicename: "",
      brandname: "",
      modelname: "" ,
      department: "",
      designation:"",
      gidno: "",
      name: "",
      issuedate: "",
      receiveddate: "",
      assetsstatus: "Issue",
      remark: ""
    }

  assetmap(Serials:String){
      this.serv.getdetaildata(Serials).subscribe((res:any)=>{
        this.formdata.devicename=res[0].device_type;
        this.formdata.brandname=res[0].brand_name;
        this.formdata.modelname=res[0].model_name;
      });

      console.log(Serials);
  }
  ngOnInit() {
    // Fetch serial numbers from the service
    this.serv.getserial().subscribe((res: serials[]) => {
      this.serialsno = res;
    });

    // Setup filtering logic for the input field
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''), debounceTime(300),
      map(value => this._filter(value || ''))
    );
  }
  onclifun(){
    if(this.formdata.serialnumber!="" && this.formdata.department!="" && this.formdata.designation!="" && this.formdata.gidno!="" && this.formdata.name!=""){
      this.serv.getassetsdetails(this.formdata).subscribe((res:any)=>{
        if(res.status=="ok"){
            alert("Asset has been Issued");
        }else{
          alert("please fill all fields");
        }
      });
    }
   
  }
  private _filter(value: string | serials): serials[] {
    // If the value is a string, proceed to filter, otherwise return an empty array
    const searchValue = typeof value === 'string' ? value.toLowerCase() : '';
    return this.serialsno.filter(option =>
      option.serial_number.toLowerCase().includes(searchValue)
    );
  }
}

@Component({
  selector: 'recieved',
  templateUrl: 'recieved.html',
  styleUrl: './inventoryissuereceived.component.css',
  standalone: true,
  imports: [FormsModule,MatFormFieldModule,MatInputModule,MatAutocompleteModule,ReactiveFormsModule,AsyncPipe,MatAutocompleteModule, MatDialogContent, MatDialogActions, MatDialogClose,MatCardModule,MatInputModule,MatFormFieldModule,MatSelectModule,CommonModule,MatButtonModule,MatOptionModule,FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class Issueassets implements OnInit {

  recformdata:any={
    serialnumber:"",
    receiveddate:"",
    receivername:"",
    assetsstatus:"received",
    remark:""
  }


   private serv=inject(ApiserviceService);

  formclick(){
    this.serv.receivedget(this.recformdata).subscribe((res:any)=>{
      if(res==1){
        alert("Assets received");
      }
    });
    
  }
  constructor(@Inject(MAT_DIALOG_DATA) public data: {name: string}) { 
      this.recformdata.serialnumber=this.data.name;
  }

  // receivedget(serialnumber:String,receiveddate:String,receivername:String,assetsstatus:String,remark:String){

  myControl = new FormControl<string | serials>('');
  options: serials[] = [];
  filteredOptions!: Observable<serials[]>;
  serialsno:any[] =[];
  ngOnInit() {
 
  }



}

