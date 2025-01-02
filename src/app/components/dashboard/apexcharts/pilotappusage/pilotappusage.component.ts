import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartsService } from '../../../service/charts.service';
import { catchError, debounceTime, switchMap } from 'rxjs/operators';
import { of, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-pilotappusage',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './pilotappusage.component.html',
  styleUrls: ['./pilotappusage.component.css']
})
export class PilotappusageComponent {
  public chartOptions: any;
  public series: ApexAxisChartSeries;

  private chrt = inject(ChartsService);
  pilotchart: any = [];
  intervalId: any;
  private dataSubscription: Subscription = new Subscription;
  private refreshInterval = 10000; // 10 seconds (adjust as needed)

  constructor() {
    this.dataSubscription = timer(0, this.refreshInterval).subscribe(() => {
      this.chrt.getpilotappchart().subscribe(
        (res: any) => {
          this.pilotchart = res[0];
          this.updateChartData(this.pilotchart.totalassign, this.pilotchart.pilotapp, this.pilotchart.epcr);
        }
      );
    });
    // Chart configuration
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

    // Initial chart data
    this.series = [
      {
        name: 'Total Assignment',
        data: [0]
      },
      {
        name: 'Got Notification',
        data: [0]
      },
      {
        name: 'Epcr',
        data: [0]
      }
    ];
  }

  ngOnInit():void {
    // Set interval to update data every second
 

 
  }

  ngOnDestroy(): void {
    // Cleanup subscription to prevent memory leaks
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
    console.log("log clear");
  }

  // Update chart data with new values
  updateChartData(total: number, pilot: number, epcr: number): void {
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
