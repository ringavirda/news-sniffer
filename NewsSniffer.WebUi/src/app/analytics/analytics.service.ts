import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Routes } from '../app-common/routes';
import { Analytics } from '../models/analytics';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private controller: string = "analytics";
  private loadedAnalytics: BehaviorSubject<Analytics> = new BehaviorSubject<Analytics>({} as Analytics);
  constructor(
    private httpClient: HttpClient
  ) { 
    this.get(new BehaviorSubject<boolean>(false));
  }

  public get(stage: BehaviorSubject<boolean>): void {
    stage.next(true);
    
    this.httpClient.get<Analytics>(Routes.baseApiUrl + this.controller).subscribe({
      next: data => {
        this.loadedAnalytics.next(data)
        stage.next(false);
      },
      error: error => {
        alert("Get Analytics Failed\n" + error.message);
        stage.next(false);
      }
    });
  }

  public getLoaded(): BehaviorSubject<Analytics> {
    return this.loadedAnalytics;
  }

  public update(stage: BehaviorSubject<boolean>) {
    stage.next(true);
    
    this.httpClient.get<Analytics>(Routes.baseApiUrl + this.controller + "/update").subscribe({
      next: data => {
        this.loadedAnalytics.next(data)
        stage.next(false);
      },
      error: error => {
        alert("Update Analytics Failed\n" + error.message);
        stage.next(false);
      }
    });
  }
}
