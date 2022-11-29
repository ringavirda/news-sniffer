import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AppCommonModule } from '../app-common/common.module';
import { HighchartsChartModule } from 'highcharts-angular';
import { AnalyticsChartsComponent } from './analytics-charts/analytics-charts.component';

@NgModule({
  declarations: [
    AnalyticsComponent,
    AnalyticsChartsComponent
  ],
  imports: [
    CommonModule,
    HighchartsChartModule,
    AppCommonModule,
    AnalyticsRoutingModule
  ]
})
export class AnalyticsModule { }
