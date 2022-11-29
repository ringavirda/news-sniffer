import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingRoutingModule } from './training-routing.module';
import { AppCommonModule } from '../app-common/common.module';
import { TrainingComponent } from './training/training.component';
import { TrainingConfigComponent } from './training-config/training-config.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
  
    TrainingComponent,
       TrainingConfigComponent
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    TrainingRoutingModule,
    FormsModule
  ]
})
export class TrainingModule { }
