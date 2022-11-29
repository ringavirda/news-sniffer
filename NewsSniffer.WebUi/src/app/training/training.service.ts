import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Routes } from '../app-common/routes';
import { ArticlesService } from '../articles/articles.service';
import { TrainingConfig } from '../models/training-config';
import { TrainingResponse } from './training-response';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private loadedConfig: BehaviorSubject<TrainingConfig>
    = new BehaviorSubject<TrainingConfig>({} as TrainingConfig);

  private controller: string = "training";

  constructor(
    private httpClient: HttpClient,
    private articlesService: ArticlesService
  ) {
    this.getConfig(new BehaviorSubject<boolean>(false));
  }

  public getLoadedConfig(): Observable<TrainingConfig> {
    return this.loadedConfig.asObservable();
  }

  public getConfig(stage: BehaviorSubject<boolean>): void {
    stage.next(true);

    this.httpClient.get<TrainingConfig>(Routes.baseApiUrl + this.controller + "/config")
      .subscribe({
        next: data => {
          this.loadedConfig.next(data);
          stage.next(false);
        },
        error: error => {
          alert("Get Config Failed\n" + error.message);
          stage.next(false);
        }
      });
  }

  public updateConfig(config: TrainingConfig, stage: BehaviorSubject<boolean>): void {
    stage.next(true);

    this.httpClient.put(Routes.baseApiUrl + this.controller + "/config", config).subscribe({
      next: data => {
        stage.next(false);
        this.loadedConfig.next(config);
      },
      error: error => {
        stage.next(false);
        alert("Update Config Failed\n" + error.message);
      }
    });
  }

  public updateSelector(stage: BehaviorSubject<boolean>): void {
    stage.next(true);
    this.httpClient.get<string[]>(Routes.baseApiUrl + this.controller + "/selector").subscribe({
      next: data => {
        stage.next(false);
        let updatedConfig = this.loadedConfig.getValue();
        updatedConfig.exclusionList = data;
        this.loadedConfig.next(updatedConfig);
      },
      error: error => {
        stage.next(false);
        alert("Update Selector Failed\n" + error.message);
      }
    });
  }

  public predictAll(stage: BehaviorSubject<boolean>): void {
    stage.next(true);

    this.httpClient.get<[{ 'articleId': number, 'conclusion': string }]>(Routes.baseApiUrl + this.controller + "/predict").subscribe({
      next: data => {
        this.articlesService.applyPredictions(data);
        stage.next(false);
      },
      error: error => {
        alert("Predict All Failed\n" + error.message);
        stage.next(false);
      }
    });
  }

  public updateModel(stage: BehaviorSubject<boolean>): void {

  }

  public trainBayas(stage: BehaviorSubject<boolean>): Observable<TrainingResponse> {
    stage.next(true);
    let subject: Subject<TrainingResponse> = new Subject<TrainingResponse>();

    this.httpClient.get<TrainingResponse>(Routes.baseApiUrl + this.controller + "/train").subscribe({
      next: data => {
        subject.next(data);
        stage.next(false);
      },
      error: error => {
        alert("Bayas Training Failed\n" + error.message);
        stage.next(false);
      }
    });

    return subject.asObservable();
  }
}
