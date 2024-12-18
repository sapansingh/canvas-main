import { Routes } from '@angular/router';
import { AssetsdetailsComponent } from './components/inventory/assetsdetails/assetsdetails.component';
import { AddinventoryComponent } from './components/inventory/addinventory/addinventory.component';
import { InventoryissuereceivedComponent } from './components/inventory/inventoryissuereceived/inventoryissuereceived.component';

export const routes: Routes = [

    {
        path:"inventorydetails",
        component:AssetsdetailsComponent
    }
    ,
    {
        path:"addinventorydetails",
        component:AddinventoryComponent
    },
    {
        path:"inventoryissue",
        component:InventoryissuereceivedComponent
    }
   
];
