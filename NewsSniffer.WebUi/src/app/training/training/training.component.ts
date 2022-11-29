import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, config, Observable, take } from 'rxjs';
import { ControlItem } from 'src/app/app-common/section-controls/control-item';
import { TrainingConfig } from 'src/app/models/training-config';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  public controls: ControlItem[] = [{
    type: "button",
    text: ["Update Selector"],
    style: "x-large bold",
    action: (stage) => {
      if (confirm("Are you sure: { Update Selector }\nThis procedure is heavy and depending on the size of the corpus may take some time.")) {
        this.trainingService.updateSelector(stage);
      }
    },
    stage: new BehaviorSubject<boolean>(false)
  }, {
    type: "button",
    text: ["Update Model"],
    style: "x-large bold",
    action: (stage) => {
      if (confirm("Are you sure: { Update Model }\nThis procedure is heavy and depending on the size of the corpus may take some time.")) {
        this.trainingService.updateModel(stage);
      }
    },
    stage: new BehaviorSubject<boolean>(false)
  }, {
    type: "button",
    text: ["Predict All"],
    style: "x-large bold",
    action: (stage) => {
      if (confirm("Are you sure: { Predict All }\nThis procedure is heavy and depending on the size of the corpus may take some time.")) {
        this.trainingService.predictAll(stage);
      }
    },
    stage: new BehaviorSubject<boolean>(false)
  }]

  public trainingConfig!: TrainingConfig;

  public constructor(
    private trainingService: TrainingService
  ) { }

  ngOnInit(): void {
    this.trainingService.getLoadedConfig().subscribe(data => this.trainingConfig = data);
  }
}
