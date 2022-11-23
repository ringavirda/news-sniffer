import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OutletAddComponent } from './outlet-add/outlet-add.component';
import { OutletDetailsComponent } from './outlet-details/outlet-details.component';
import { OutletsComponent } from './outlets/outlets.component';

const routes: Routes = [
  { path: "outlets", component: OutletsComponent },
  { path: "outlets/new", component: OutletAddComponent },
  { path: "outlets/:id", component: OutletDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutletsRoutingModule { }
