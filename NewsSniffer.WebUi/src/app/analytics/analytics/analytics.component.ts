import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ControlItem } from 'src/app/app-common/section-controls/control-item';
import { Analytics } from 'src/app/models/analytics';
import { AnalyticsService } from '../analytics.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  analytics!: Analytics;
  public controls: ControlItem[] = [{
    type: "button",
    text: ["Update Analytics"],
    style: "x-large bold",
    action: (stage: BehaviorSubject<boolean>) => {
      this.analyticsService.update(stage);
    },
    stage: new BehaviorSubject<boolean>(false)
  }];
  constructor(
    private analyticsService: AnalyticsService
  ) { }
  
  ngOnInit(): void {
    this.analyticsService.getLoaded().subscribe(data => this.analytics = data);
  }
}
