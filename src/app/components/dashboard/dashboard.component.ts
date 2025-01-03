import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import {
  NgApexchartsModule
} from "ng-apexcharts";
import { PilotappusageComponent } from "./apexcharts/pilotappusage/pilotappusage.component";

@Component({
    selector: 'app-dashboard',
    imports: [NgApexchartsModule, PilotappusageComponent],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})

export class DashboardComponent {
}
