import { AfterViewInit, Component, inject, ViewChild, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ApiserviceService, assetsdataapi } from '../../service/apiservice.service';
import { MatCardModule } from '@angular/material/card';

import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-assetsdetails',
    imports: [
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        CommonModule
    ],
    templateUrl: './assetsdetails.component.html',
    styleUrls: ['./assetsdetails.component.css']
})
export class AssetsdetailsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'deviceType', 'brandName', 'modelName', 'invoiceno', 'serialNumber', 'assetsreciveddate', 'specification', 'warrantydate', 'imeino1', 'imeino2', 'assetTag'];
  dataSource = new MatTableDataSource<assetsdataapi>([]);// Initialize with an empty array

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  private apiservice = inject(ApiserviceService);
tabledata:any;
  ngOnInit(): void {
    this.apiservice.getassetdata().subscribe((assets: assetsdataapi[]) => {
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
// The interface for the asset data

