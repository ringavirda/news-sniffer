import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Routes } from '../app-common/routes';
import { Article } from './article';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  private loadedArticles: BehaviorSubject<Article[]> = new BehaviorSubject<Article[]>([]);
  
  constructor(
    private httpClient: HttpClient
    ) {
      this.getAllRequest(new Subject<boolean>());
    }
    
    getAllRequest(stage: Subject<boolean>): void {
      stage.next(true);
      
      this.httpClient.get<Article[]>(Routes.baseApiUrl + "articles/all")
      .subscribe({
        next: data => {
          this.loadedArticles.next(this.sortArticles(data));
          stage.next(false);
        },
        error: error => {
          alert(error.message);
          stage.next(false);
        }
      });;
    }
    
    UpdateRequest(stage: Subject<boolean>): void {
      stage.next(true);
      
      this.httpClient.post<Article[]>(Routes.baseApiUrl + "articles/update", "")
      .subscribe({
        next: data => {
          this.loadedArticles.next(this.sortArticles(this.loadedArticles.getValue().concat(data)));
          stage.next(false);
        },
        error: error => {
          alert(error.message);
          stage.next(false);
        }
      });
    }

  getLoadedArticles(): Observable<Article[]> {
    return this.loadedArticles;
  }
  
  getLoadedArticleById(id: number): Article {
    return this.loadedArticles.getValue().find(art => art.id == id) as Article;
  }

  private sortArticles(articles: Article[]): Article[] {
    return articles.sort((first, second) => new Date(second.date).getTime() - new Date(first.date).getTime())
  }
  
}
