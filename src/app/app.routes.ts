import { Routes } from '@angular/router';
import { AssetsdetailsComponent } from './components/inventory/assetsdetails/assetsdetails.component';
import { AddinventoryComponent } from './components/inventory/addinventory/addinventory.component';
import { InventoryissuereceivedComponent } from './components/inventory/inventoryissuereceived/inventoryissuereceived.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AssignmentComponent } from './components/analytics/assignment/assignment.component';

export const routes: Routes = [

    {
        path:"inventorydetails",
        component:AssetsdetailsComponent
    },
    {path:"Assignment",
        component:AssignmentComponent
    }
    ,
    {
        path:"addinventorydetails",
        component:AddinventoryComponent
    },
    {
        path:"inventoryissue",
        component:InventoryissuereceivedComponent
    },
    {path:"dashboard",
        component:DashboardComponent
    }
   
];
