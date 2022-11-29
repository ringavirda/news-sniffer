import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Routes } from '../app-common/routes';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  
  private loadedArticles: BehaviorSubject<Article[]> = new BehaviorSubject<Article[]>([]);
  private filteredArticles: BehaviorSubject<Article[]> = new BehaviorSubject<Article[]>([]);

  private lastFilters = {
    markerFilter: "all",
    impressionFilter: "all"
  }

  private controller: string = "articles";

  constructor(
    private httpClient: HttpClient
  ) {
    this.getAll(new BehaviorSubject<boolean>(false));
  }

  // Loaded
  public getAllLoaded(): Observable<Article[]> {
    return this.loadedArticles;
  }

  public getAllFiltered(): Observable<Article[]> {
    return this.filteredArticles;
  }

  public getLoadedById(id: number): Article {
    return this.loadedArticles.getValue().find(art => art.id == id) as Article;
  }

  // Get
  public getAll(stage: BehaviorSubject<boolean>): void {
    stage.next(true);

    this.httpClient.get<Article[]>(Routes.baseApiUrl + this.controller)
      .subscribe({
        next: data => {
          this.loadedArticles.next(this.sortArticles(data));
          this.applyFilters(this.lastFilters.markerFilter, this.lastFilters.impressionFilter);
          stage.next(false);
        },
        error: error => {
          alert("Get All Articles Failed\n" + error.message);
          stage.next(false);
        }
      });;
  }

  public getById(id: number, stage: BehaviorSubject<boolean>): Observable<Article> {
    let subject = new Subject<Article>();

    this.httpClient.get<Article>(Routes.baseApiUrl + this.controller + `/${id}`).subscribe({
      next: data => {
        stage.next(false);
        subject.next(data);
      },
      error: error => {
        alert("Get Article By Id Failed" + error.message);
        stage.next(true);
      }
    });

    return subject.asObservable();
  }

  // Create


  // Update
  public update(article: Article, stage: BehaviorSubject<boolean>): Observable<Article> {
    stage.next(true);
    let subject = new Subject<Article>();
    console.log(article)
    
    this.httpClient.put(Routes.baseApiUrl + this.controller, article).subscribe({
      next: data => {
        let loaded = this.loadedArticles.getValue();
        loaded[loaded.findIndex(a => a.id === article.id)] = article;
        this.loadedArticles.next(loaded);
        this.applyFilters(this.lastFilters.markerFilter, this.lastFilters.impressionFilter);
        stage.next(false);
        subject.next(article);
      },
      error: error => {
        alert("Update Article Failed\n" + error.message);
        stage.next(false);
      }
    });

    return subject.asObservable();
  }

  // Delete
  public delete(article: Article, stage: BehaviorSubject<string>): void {
    stage.next("active");

    this.httpClient.delete(Routes.baseApiUrl + this.controller + `/${article.id}`).subscribe({
      next: data => {
        stage.next("completed");
        var loaded = this.loadedArticles.getValue();
        const index = loaded.indexOf(article, 0);
        if (index > -1) {
          loaded.splice(index, 1);
        }
        this.loadedArticles.next(loaded);
        this.applyFilters(this.lastFilters.markerFilter, this.lastFilters.impressionFilter);
      },
      error: error => {
        alert("Delete Article Failed\n" + error.message);
        stage.next("inactive");
      }
    });
  }

  public deleteAll(stage: BehaviorSubject<boolean>): void {
    stage.next(true);

    this.httpClient.delete(Routes.baseApiUrl + this.controller).subscribe({
      next: data => {
        stage.next(false);
        this.loadedArticles.next([]);
        this.applyFilters(this.lastFilters.markerFilter, this.lastFilters.impressionFilter);
      },
      error: error => {
        stage.next(false);
        alert("Delete All Failed\n" + error.message);
      }
    })
  }

  // Misc
  public applyFilters(markerFilter: string | null, impressionFilter: string | null): void {
    if (!markerFilter) {
      markerFilter = "all";
    }
    if (!impressionFilter) {
      impressionFilter = "all";
    }
    this.lastFilters.markerFilter = markerFilter;
    this.lastFilters.impressionFilter = impressionFilter;

    this.filteredArticles.next(this.loadedArticles.getValue().filter(article => {
      return (markerFilter === "all" || article.marker === markerFilter)
        && (impressionFilter === "all" || article.impression === impressionFilter);
    }));
  }

  public updateBackend(stage: BehaviorSubject<boolean>): void {
    stage.next(true);

    this.httpClient.get<Article[]>(Routes.baseApiUrl + this.controller + "/update")
      .subscribe({
        next: data => {
          this.loadedArticles.next(this.sortArticles(this.loadedArticles.getValue().concat(data)));
          this.applyFilters(this.lastFilters.markerFilter, this.lastFilters.impressionFilter);
          stage.next(false);
        },
        error: error => {
          alert("Update Backend Failed\n" + error.message);
          stage.next(false);
        }
      });
  }

  public applyPredictions(data: [{ articleId: number; conclusion: string; }]) {
    let loaded = this.loadedArticles.getValue();
    loaded.forEach(article => 
      article.prediction = data.find(pr => pr.articleId == article.id)?.conclusion ?? "none");
    this.loadedArticles.next(loaded);
  }

  // Private
  private sortArticles(articles: Article[]): Article[] {
    return articles.sort((first, second) => new Date(second.date).getTime() - new Date(first.date).getTime())
  }
}
