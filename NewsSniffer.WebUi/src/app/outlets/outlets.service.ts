import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, subscribeOn } from 'rxjs';
import { Routes } from '../app-common/routes';
import { Article } from '../articles/article';
import { Outlet } from './outlet';

@Injectable({
  providedIn: 'root'
})
export class OutletsService {
  private loadedOutlets: BehaviorSubject<Outlet[]> = new BehaviorSubject<Outlet[]>([]);
  
  constructor(
    private httpClient: HttpClient
    ) {
      this.getAllOutlets().subscribe(data => this.loadedOutlets.next(data));
     }
    
    getLoadedOutlets(): Observable<Outlet[]> {
      return this.loadedOutlets;
    }

    getAllOutlets(): Observable<Outlet[]> {
      return this.httpClient.get<Outlet[]>(Routes.baseApiUrl + "outlets/all");
    }
    
    getLoadedOutletById(id: number): Outlet {
      return this.loadedOutlets.getValue().find(outlet => outlet.id == id) as Outlet;
    }
    
    performTestOnConfig(outlet: Outlet): Observable<Article> {
      return this.httpClient.post<Article>(Routes.baseApiUrl + "outlets/test", outlet);
    }
    
    DeleteOutlet(outlet: Outlet, stage: BehaviorSubject<string>) {
      stage.next("active");
      
      this.httpClient.delete(Routes.baseApiUrl + `outlets/delete/${outlet.id}`).subscribe({
        next: data => {
          stage.next("completed");
          var outlets = this.loadedOutlets.getValue();
          const index = outlets.indexOf(outlet, 0);
          if (index > -1) {
            outlets.splice(index, 1);
          }
          this.loadedOutlets.next(outlets);
        },
        error: error => {
          stage.next("inactive");
          alert(error.message);
      }
    });
  }

  UpdateOutlet(outlet: Outlet, stage: BehaviorSubject<boolean>) {
    stage.next(true);
    
    this.httpClient.post(Routes.baseApiUrl + "outlets/update", outlet).subscribe({
      next: data => {
        stage.next(false);
        var outlets = this.loadedOutlets.getValue();
        const index = outlets.indexOf(outlet, 0);
        if (index > -1) {
          outlets[index] = outlet;
        }
        this.loadedOutlets.next(outlets);
      },
      error: error => {
        stage.next(false);
        alert(error.message);
      }
    });
  }

  createOutlet(outlet: Outlet, stage: BehaviorSubject<boolean>) {
    stage.next(true);

    this.httpClient.post(Routes.baseApiUrl + "outlets/new", outlet).subscribe({
      next: data => {
        alert(`Outlet ${outlet.name} was successfully created!`);
        this.loadedOutlets.getValue().push(outlet);
        stage.next(false);
      },
      error: error => {
        alert(error.message);
        stage.next(false);
      }
    })
  }
}
