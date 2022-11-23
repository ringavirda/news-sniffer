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
  
  markerSelector!: BehaviorSubject<string>;
  impressionSelector!: BehaviorSubject<string>;
  
  applyRunning: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  constructor(
    private articlesService: ArticlesService
  ) { }
  
  ngOnInit(): void {
    this.markerSelector = new BehaviorSubject<string>(this.article.marker);
    this.impressionSelector = new BehaviorSubject<string>(this.article.impression);
  }

  isApply(): boolean {
    return this.markerSelector.getValue() !== this.article.marker || this.impressionSelector.getValue() !== this.article.impression;
  }

  onApply(): void {
    let changedArticle : Article = {
      id: this.article.id,
      title: this.article.title,
      date: this.article.date,
      articleHref: this.article.articleHref,
      outletCode: this.article.outletCode,
      body: this.article.body,

      marker: this.markerSelector.getValue(),
      impression: this.impressionSelector.getValue()
    }

    this.articlesService.updateArticleRequest(changedArticle, this.applyRunning)
      .subscribe(data => this.article = data);
  }
}
