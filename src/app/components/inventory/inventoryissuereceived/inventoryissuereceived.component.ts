import { AfterViewInit, Component, inject, ViewChild, OnInit, ChangeDetectionStrategy, Injectable } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ApiserviceService, assetsdataapi } from '../../service/apiservice.service';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import {
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
  recived() {
    this.dialog.open(Issueassets);
  }
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

  myControl = new FormControl<string | serials>('');
  options: serials[] = [];
  filteredOptions!: Observable<serials[]>;
  serialsno:any[] =[];
  ngOnInit() {
 
  }
  displayFn(serials: serials): string {
    return serials && serials.serial_number ? serials.serial_number : '';
  }


}

