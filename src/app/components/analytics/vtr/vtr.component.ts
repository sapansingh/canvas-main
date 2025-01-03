import { AfterViewInit, Component, inject, ViewChild, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ApiserviceService, assetsdataapi } from '../../service/apiservice.service';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser'; // Required for any Angular application
import { MatDatepickerModule } from '@angular/material/datepicker'; // For MatDatepicker
import { MatFormFieldModule } from '@angular/material/form-field'; // For MatFormField
import { MatInputModule } from '@angular/material/input'; // For input fields
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core'; // For native date handling
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // For two-way data binding
import { AnalyticsService } from '../../service/analytics.service';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogContent, MatDialogActions, MatDialogClose, MatDialog } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { pregresdialod } from '../progressh';


@Component({
  selector: 'app-vtr',
  imports: [MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule],
  templateUrl: './vtr.component.html',
  styleUrl: './vtr.component.css',
  providers: [DatePipe]
})
export class VtrComponent { constructor(private datePipe: DatePipe,private dialog: MatDialog){

}
dialogRef: any;

openDialog() {
 this.dialogRef= this.dialog.open(pregresdialod, {
    data: {
      animal: 'panda',
    },
  });
}
closeDialog() {
  if (this.dialogRef) {
    this.dialogRef.close(); // Close the dialog
  }
}
  displayedColumns: string[] = ['id', 'callid',
'vehicle_no',
'contact_number',
'vehicle_distance',
'attempted_time',
'feedback_remarks_description',
'callback_time',
'ero_id',
'vb_id',
'chief_complaint_name',
'district_name',
'mandal_name',
'city_name',
'landmark',

];
  dataSource = new MatTableDataSource<any>([]);// Initialize with an empty array

  private anaserv=inject(AnalyticsService);
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

payload:any={
date1:"",
date2:""
}

id:number=0;

  getdata(){
    this.openDialog();
  this.id=0;
    this.payload.date1=this.datePipe.transform( this.payload.date1, 'yyyy-MM-dd');
    this.payload.date2=this.datePipe.transform( this.payload.date2, 'yyyy-MM-dd');
  
    if(this.payload.date1 == null || this.payload.date2==null){
   
      this.dialogRef.close();
    }else{
      this.anaserv.getvtr(this.payload).subscribe((res:any)=>{
        this.dataSource.data=res;
        this.dialogRef.close();
       
      });
    }
  }
tabledata:any;
  ngOnInit(): void {
 
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
  exportdata() {
    this.payload.date1=this.datePipe.transform( this.payload.date1, 'yyyy-MM-dd');
    this.payload.date2=this.datePipe.transform( this.payload.date2, 'yyyy-MM-dd');
    const baseurlr: string = "http://192.168.200.224/"; // Ensure baseurl is set
    const url: string = `${baseurlr}/gvkprod/v2/app/analytics/assignmentexport.php?start=${this.payload.date1}&end=${this.payload.date2}`;
  
    // Open the new URL in a new tab
    window.open(url, '_blank');
  
    console.log(baseurlr); // To check if baseurl is logged correctly
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
