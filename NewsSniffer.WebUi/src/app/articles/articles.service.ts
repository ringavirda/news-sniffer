import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
    this.getAllArticles().subscribe(data => {
      this.loadedArticles.next(data);
    });
  }

  UpdateArticles() {
    this.httpClient.post<Article[]>(Routes.baseApiUrl + "articles/update", "")
      .subscribe((data: Article[]) => this.loadedArticles.next(this.loadedArticles.getValue().concat(data)));
  }

  getLoadedArticles(): Article[] {
    return this.loadedArticles.getValue();
  }

  getArticleById(id: number): Article {
    return this.loadedArticles.getValue().find(art => art.id == id) as Article;
  }

  getAllArticles(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(Routes.baseApiUrl + "articles/all");
  }
}
