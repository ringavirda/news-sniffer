import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OutletsRoutingModule } from './outlets-routing.module';
import { OutletListComponent } from './outlet-list/outlet-list.component';
import { OutletsComponent } from './outlets/outlets.component';
import { OutletDetailsComponent } from './outlet-details/outlet-details.component';
import { OutletAddComponent } from './outlet-add/outlet-add.component';
import { AppCommonModule } from '../app-common/common.module';
import { FormsModule } from '@angular/forms';
import { OutletTestComponent } from './outlet-test/outlet-test.component';


@NgModule({
  declarations: [
    OutletListComponent,
    OutletsComponent,
    OutletDetailsComponent,
    OutletAddComponent,
    OutletTestComponent
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    OutletsRoutingModule,
    FormsModule
  ]
})
export class OutletsModule { }
