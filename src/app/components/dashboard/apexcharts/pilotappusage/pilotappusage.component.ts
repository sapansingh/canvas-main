import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartsService } from '../../../service/charts.service';

@Component({
  selector: 'app-pilotappusage',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './pilotappusage.component.html',
  styleUrl: './pilotappusage.component.css'
})
export class PilotappusageComponent  {
public chartOptions: any;
  public series: ApexAxisChartSeries;

  private chrt=inject(ChartsService);
pilotchart:any=[];
intervalId: any;
 

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.chrt.getpilotappchart().subscribe((res:any)=>{
        this.pilotchart=res[0];
      });
    }, 10000);

    this.updateChartData(this.pilotchart.totalassign,this.pilotchart.pilotapp,this.pilotchart.epcr);

  }
  
  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  
 
 constructor(){
  this.chartOptions = {
    chart: {
      height: 250,
      type: 'bar', // You can change this to other chart types like 'bar', 'pie', etc.
    },
    stroke: {
      curve: 'smooth', // Smooth line curve
    },
    title: {
      text: 'Pilot App',
      align: 'left',
    },
    xaxis: {
      categories: ['Today'],
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
      name: 'Total Assignment',
      data: [1]
    },
    {
      name: 'Got Notification',
      data: [1]
    },
    {
      name: 'Epcr',
      data: [1]
    }
  ];
 }
    // Chart configuration
   
  

  updateChartData(total:number,pilot:number,epcr:number): void {

    
    // New data to update
    this.series = [
      {
        name: 'Total Assignment',
        data: [total]
      },
      {
        name: 'Got Notification',
        data: [pilot]
      },
      {
        name: 'Epcr',
        data: [epcr]
      }
    ];

    // Optionally, update the title or other properties dynamically
    this.chartOptions = { ...this.chartOptions, title: { text: 'Pilot App' } };

 
  }


}
function updateChartData(total: any, number: any, pilot: any, number1: any, epcr: any, number2: any) {
  throw new Error('Function not implemented.');
}

