import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Article } from 'src/app/models/article';
import { ArticlesService } from '../articles.service';

@Component({
  selector: 'app-article-list-item',
  templateUrl: './article-list-item.component.html',
  styleUrls: ['./article-list-item.component.scss']
})
export class ArticleListItemComponent implements OnInit {
  @Input() article!: Article;
  
  public markerSelector!: BehaviorSubject<string>;
  public impressionSelector!: BehaviorSubject<string>;
  
  public applyRunning: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  public constructor(
    private articlesService: ArticlesService
  ) { }
  
  ngOnInit(): void {
    this.markerSelector = new BehaviorSubject<string>(this.article.marker);
    this.impressionSelector = new BehaviorSubject<string>(this.article.impression);
  }

  public isApply(): boolean {
    return this.markerSelector.getValue() !== this.article.marker || this.impressionSelector.getValue() !== this.article.impression;
  }

  public onApply(): void {
    let changedArticle : Article = {
      id: this.article.id,
      title: this.article.title,
      date: this.article.date,
      articleHref: this.article.articleHref,
      outletCode: this.article.outletCode,
      body: this.article.body,
      ngram: this.article.ngram,
      prediction: this.article.prediction,

      marker: this.markerSelector.getValue(),
      impression: this.impressionSelector.getValue()
    }

    this.articlesService.update(changedArticle, this.applyRunning)
      .subscribe(data => this.article = data);
  }
}
