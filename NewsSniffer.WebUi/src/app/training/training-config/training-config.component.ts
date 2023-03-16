import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TrainingConfig } from 'src/app/models/training-config';
import { TrainingResponse } from '../training-response';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-training-config',
  templateUrl: './training-config.component.html',
  styleUrls: ['./training-config.component.scss']
})
export class TrainingConfigComponent {
  public applyModelRunning: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public applySelectorRunning: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public bayasTrainingResults!: TrainingResponse;
  public bayasTrainingRunning: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public bayasTrainingShowResults: boolean = false;
  public config!: TrainingConfig;
  public modelSelected: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public modeSelected: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public newCutoff: string = "";
  public newNegativeGage!: string;
  public newPositiveGage!: string;
  public newSimilarness: string = "";
  public constructor(
    private trainingService: TrainingService
  ) { }

  ngOnInit(): void {
    this.trainingService.getLoadedConfig().subscribe(data => {
      this.config = data;
      this.modeSelected.next(data.bayasMode);
      this.modelSelected.next(data.model);
    });
  }

  public gagesCorrect() {
    if (!Number(this.newNegativeGage) || !Number(this.newPositiveGage)) {
      return false;
    }
    return Number(this.newNegativeGage) < Number(this.newPositiveGage);
  }

  public onBayasTrain(): void {
    this.trainingService.trainBayas(this.bayasTrainingRunning).subscribe(data => {
      this.bayasTrainingResults = data;
      this.bayasTrainingShowResults = true;
    });
  }

  public onModelApply() {
    let newConfig = {
      cutoffRank: this.config.cutoffRank,
      similarnessRank: this.config.similarnessRank,
      exclusionList: this.config.exclusionList,
      model: this.modelSelected.getValue(),
      bayasPositiveGage: 
        isNaN(Number(this.newPositiveGage)) ? this.config.bayasPositiveGage : Number(this.newPositiveGage),
      bayasNegativeGage: 
        isNaN(Number(this.newNegativeGage)) ? this.config.bayasNegativeGage : Number(this.newNegativeGage),
      bayasMode: this.modeSelected.getValue()
    } as TrainingConfig

    this.newPositiveGage = "";
    this.newNegativeGage = "";

    this.trainingService.updateConfig(newConfig, this.applyModelRunning);
  }

  public onSelectorApply(): void {
    let newConfig = {
      cutoffRank: Number(this.newCutoff),
      similarnessRank: Number(this.newSimilarness),
      exclusionList: [],
      model: this.config.model,
      bayasPositiveGage: this.config.bayasPositiveGage,
      bayasNegativeGage: this.config.bayasNegativeGage,
      bayasMode: this.config.bayasMode
    } as TrainingConfig

    this.newCutoff = "";
    this.newSimilarness = "";

    this.config.exclusionList = [];
    this.trainingService.updateConfig(newConfig, this.applySelectorRunning);
  }

  public valueValid(value: string): boolean {
    if (!Number(value)) {
      return false;
    } else {
      let num = Number(value);
      return num >= 0 && num <= 1;
    }
  }
}
