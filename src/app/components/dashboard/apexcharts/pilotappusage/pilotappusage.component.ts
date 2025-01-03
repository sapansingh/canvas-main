import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartsService } from '../../../service/charts.service';
import { Subscription, timer } from 'rxjs';
import { AnalyticsService } from '../../../service/analytics.service';

@Component({
  selector: 'app-pilotappusage',
  imports: [NgApexchartsModule],
  templateUrl: './pilotappusage.component.html',
  styleUrls: ['./pilotappusage.component.css']
})
export class PilotappusageComponent implements OnInit, OnDestroy {
  public chartOptions: any;
  public series: ApexAxisChartSeries;
  private dataSubscription: Subscription = new Subscription();
  private refreshInterval = 10000; // 10 seconds
  pilotchart: any = [];

  constructor(
    private chrt: ChartsService,
    private srefrsh: AnalyticsService
  ) {
    // Initialize chart options
    this.chartOptions = {
      chart: {
        height: 250,
        type: 'bar',
      },
      stroke: {
        curve: 'smooth',
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

    // Initial chart data (set to zero)
    this.series = [
      { name: 'Total Assignment', data: [0] },
      { name: 'Got Notification', data: [0] },
      { name: 'Pilot App', data: [0] },
      { name: 'Epcr', data: [0] },
     
    ];
  }

  ngOnInit(): void {
    // Set interval to update data every 10 seconds
    this.dataSubscription = timer(0, this.refreshInterval).subscribe(() => {
      this.chrt.getpilotappchart().subscribe(
        (res: any) => {
          if (res && res[0]) {
            this.pilotchart = res[0];
            // Update the chart with the new data
            this.updateChartData(
              this.pilotchart.totalassign,
              this.pilotchart.pilotapp,
              this.pilotchart.epcr,
              this.pilotchart.notification
            );
          } else {
            console.warn('No data available or invalid format received');
          }
        },
        (error) => {
          console.error('Error fetching pilot app data', error);
        }
      );
    });
  }

  ngOnDestroy(): void {
    // Cleanup subscription to prevent memory leaks
    this.dataSubscription.unsubscribe();
    console.log('Data subscription cleared');
  }

  // Method to update chart data
  updateChartData(
    total: number | undefined,
    pilot: number | undefined,
    epcr: number | undefined,
    notification: number | undefined
  ): void {
    // Check if the received values are numbers (or default to zero if undefined)
    total = typeof total === 'number' ? total : 0;
    pilot = typeof pilot === 'number' ? pilot : 0;
    epcr = typeof epcr === 'number' ? epcr : 0;
    notification = typeof notification === 'number' ? notification : 0;

    // Update the chart series with the new data
    this.series = [
      { name: 'Total Assignment', data: [total] },
      { name: 'Got Notification', data: [notification] },
      { name: 'Pilot App', data: [pilot] },
      { name: 'Epcr', data: [epcr] },
     
    ];

    // Optionally, update other chart properties dynamically
    this.chartOptions = { ...this.chartOptions, title: { text: 'Pilot App' } };
  }
}
