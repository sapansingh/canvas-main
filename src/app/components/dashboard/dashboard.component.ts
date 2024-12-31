import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import {
  NgApexchartsModule
} from "ng-apexcharts";
import { PilotappusageComponent } from "./apexcharts/pilotappusage/pilotappusage.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgApexchartsModule, PilotappusageComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {
  public chartOptions: any;
  public series: ApexAxisChartSeries;
  constructor(private cdr: ChangeDetectorRef) {
    // Chart configuration
    this.chartOptions = {
      chart: {
        height: 350,
        type: 'bar', // You can change this to other chart types like 'bar', 'pie', etc.
      },
      stroke: {
        curve: 'smooth', // Smooth line curve
      },
      title: {
        text: 'Sales Data',
        align: 'left',
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
      },
    };

    // Chart data series
    this.series = [
      {
        name: 'Product A',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 98, 105, 110]
      },
      {
        name: 'Product B',
        data: [10, 25, 40, 45, 49, 60, 62, 80, 99, 85, 90, 95]
      }
    ];
  } 

  updateChartData(): void {
    // New data to update
    this.series = [
      {
        name: 'Product A',
        data: [40, 50, 60, 70, 85, 90, 100, 115, 130, 150, 160, 180],
      },
      {
        name: 'Product B',
        data: [20, 30, 45, 55, 65, 75, 85, 100, 110, 120, 130, 140],
      },
    ];

    // Optionally, update the title or other properties dynamically
    this.chartOptions = { ...this.chartOptions, title: { text: 'Updated Sales Data' } };

    // Trigger change detection manually if needed
    this.cdr.detectChanges();
  }
}
