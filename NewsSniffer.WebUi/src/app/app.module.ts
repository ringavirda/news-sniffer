import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { ArticlesModule } from './articles/articles.module';
import { AppCommonModule } from './app-common/common.module';
import { HttpClientModule} from '@angular/common/http';
import { OutletsModule } from './outlets/outlets.module';
import { TrainingModule } from './training/training.module';
import { AnalyticsModule } from './analytics/analytics.module';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ArticlesModule,
    OutletsModule,
    TrainingModule,
    AnalyticsModule,
    AppCommonModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
