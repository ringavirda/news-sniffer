import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingRoutingModule } from './training-routing.module';
import { AppCommonModule } from '../app-common/common.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    TrainingRoutingModule
  ]
})
export class TrainingModule { }
