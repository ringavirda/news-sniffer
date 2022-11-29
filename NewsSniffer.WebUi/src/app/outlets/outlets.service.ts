import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, subscribeOn } from 'rxjs';
import { Routes } from '../app-common/routes';
import { Article } from '../models/article';
import { Outlet } from '../models/outlet';

@Injectable({
  providedIn: 'root'
})
export class OutletsService {
  private loadedOutlets: BehaviorSubject<Outlet[]> = new BehaviorSubject<Outlet[]>([]);

  private controller: string = "outlets";

  constructor(
    private httpClient: HttpClient
  ) {
    this.getAll(new BehaviorSubject<boolean>(false));
  }

  // Loaded
  public getAllLoaded(): Observable<Outlet[]> {
    return this.loadedOutlets;
  }

  public getLoadedById(id: number): Outlet {
    return this.loadedOutlets.getValue().find(outlet => outlet.id == id) as Outlet;
  }

  // Get
  public getAll(stage: BehaviorSubject<boolean>): void {
    stage.next(true);

    this.httpClient.get<Outlet[]>(Routes.baseApiUrl + this.controller).subscribe({
      next: data => {
        this.loadedOutlets.next(data);
        stage.next(false);
      },
      error: error => {
        alert("Get All Outlets Failed\n" + error.message);
        stage.next(false);
      } 
    });
  }

  // Create
  public create(outlet: Outlet, stage: BehaviorSubject<boolean>): void {
    stage.next(true);

    if (this.loadedOutlets.getValue().find(o => o.code === outlet.code) !== undefined) {
      alert("Outlet with such code already exists!");
      stage.next(false);
      return;
    }

    this.httpClient.post(Routes.baseApiUrl + this.controller, outlet).subscribe({
      next: data => {
        alert(`Outlet ${outlet.name} was successfully created`);
        this.loadedOutlets.getValue().push(outlet);
        stage.next(false);
      },
      error: error => {
        alert("Create Outlet Failed\n" + error.message);
        stage.next(false);
      }
    });
  }


  // Update
  public update(outlet: Outlet, stage: BehaviorSubject<boolean>): void {
    stage.next(true);

    this.httpClient.put(Routes.baseApiUrl + this.controller, outlet).subscribe({
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
        alert("Update Outlet Failed\n" + error.message);
        stage.next(false);
      }
    });
  }
  
  // Delete
  public delete(outlet: Outlet, stage: BehaviorSubject<string>) : void {
    stage.next("active");

    this.httpClient.delete(Routes.baseApiUrl + this.controller + `/${outlet.id}`).subscribe({
      next: data => {
        stage.next("completed");
        var loaded = this.loadedOutlets.getValue();
        const index = loaded.indexOf(outlet, 0);
        if (index > -1) {
          loaded.splice(index, 1);
        }
        this.loadedOutlets.next(loaded);
      },
      error: error => {
        alert("Delete Outlet Failed\n" + error.message);
        stage.next("inactive");
      }
    });
  }

  public deleteAll(stage: BehaviorSubject<boolean>): void {
    stage.next(true);

    this.httpClient.delete(Routes.baseApiUrl + this.controller).subscribe({
      next: data => {
        stage.next(false);
        this.loadedOutlets.next([]);
      },
      error: error => {
        alert("Delete All Outlets Failed\n" + error.message);
        stage.next(false);
      }
    });
  }
  
  // Misc
  public performTestRequest(outlet: Outlet): Observable<Article> {
    return this.httpClient.post<Article>(Routes.baseApiUrl + this.controller + "/test", outlet);
  }
}
