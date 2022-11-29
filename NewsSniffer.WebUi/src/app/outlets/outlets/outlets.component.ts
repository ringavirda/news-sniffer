import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ControlItem } from 'src/app/app-common/section-controls/control-item';
import { OutletsService } from '../outlets.service';

@Component({
  selector: 'app-outlets',
  templateUrl: './outlets.component.html',
  styleUrls: ['./outlets.component.scss']
})
export class OutletsComponent {
  controls: ControlItem[] = [{
    type: "button",
    text: ["New Outlet"],
    style: "x-large bold",
    action: (stage) => {
      this.router.navigateByUrl("outlets/new");
    },
    stage: new BehaviorSubject(false)
  },{
    type: "button",
    text: ["Delete All"],
    style: "large",
    action: (stage) => {
      if (confirm("Are you sure: {Deleting All Outlets}?")) {
        this.outletsService.deleteAll(stage);
      }
    },
    stage: new BehaviorSubject<boolean>(false)
  }]

  constructor(
    private router: Router,
    private outletsService: OutletsService
  ) { }
}
