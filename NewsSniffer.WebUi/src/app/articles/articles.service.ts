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
  private filteredLoadedArticles: BehaviorSubject<Article[]> = new BehaviorSubject<Article[]>([]);

  private lastFilters = {
    markerFilter: "all",
    impressionFilter: "all"
  }

  constructor(
    private httpClient: HttpClient
  ) {
    this.getAllRequest(new BehaviorSubject<boolean>(false));
  }

  getAllRequest(stage: BehaviorSubject<boolean>): void {
    stage.next(true);

    this.httpClient.get<Article[]>(Routes.baseApiUrl + "articles/all")
      .subscribe({
        next: data => {
          this.loadedArticles.next(this.sortArticles(data));
          this.applyFilters(this.lastFilters.markerFilter, this.lastFilters.impressionFilter);
          stage.next(false);
        },
        error: error => {
          console.error(error.message);
          stage.next(false);
        }
      });;
  }

  updateRequest(stage: BehaviorSubject<boolean>): void {
    stage.next(true);

    this.httpClient.post<Article[]>(Routes.baseApiUrl + "articles/update", "")
      .subscribe({
        next: data => {
          this.loadedArticles.next(this.sortArticles(this.loadedArticles.getValue().concat(data)));
          stage.next(false);
        },
        error: error => {
          console.error(error.message);
          stage.next(false);
        }
      });
  }

  updateArticleRequest(article: Article, stage: BehaviorSubject<boolean>): Observable<Article> {
    stage.next(true);
    let subject = new Subject<Article>();
    this.httpClient.put(Routes.baseApiUrl + "articles/update", article).subscribe({
      next: data => {
        let loaded = this.loadedArticles.getValue();
        loaded[loaded.findIndex(a => a.id === article.id)] = article;
        this.loadedArticles.next(loaded);
        this.applyFilters(this.lastFilters.markerFilter, this.lastFilters.impressionFilter);
        stage.next(false);
        subject.next(article);
      },
      error: error => {
        alert("Applying changes failed!\n" + error.message);
        stage.next(false);
      }
    });

    return subject.asObservable();
  }

  getLoadedArticles(): BehaviorSubject<Article[]> {
    return this.loadedArticles;
  }

  getFilteredLoadedArticles(): BehaviorSubject<Article[]> {
    return this.filteredLoadedArticles;
  } 

  getLoadedArticleById(id: number): Article {
    return this.loadedArticles.getValue().find(art => art.id == id) as Article;
  }

  applyFilters(markerFilter: string | null, impressionFilter: string | null): void {
    if (!markerFilter) {
      markerFilter = "all";
    }
    if (!impressionFilter) {
      impressionFilter = "all";
    }
    this.lastFilters.markerFilter = markerFilter;
    this.lastFilters.impressionFilter = impressionFilter;

    this.filteredLoadedArticles.next(this.loadedArticles.getValue().filter(article => {
      return (markerFilter === "all" || article.marker === markerFilter) 
      && (impressionFilter === "all" || article.impression === impressionFilter);
    }));
  }

  private sortArticles(articles: Article[]): Article[] {
    return articles.sort((first, second) => new Date(second.date).getTime() - new Date(first.date).getTime())
  }

}
