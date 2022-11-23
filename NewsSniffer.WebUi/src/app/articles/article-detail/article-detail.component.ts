import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Article } from '../article';
import { ArticlesService } from '../articles.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit, OnDestroy  {
  article!: Article;
  private routeSub!: Subscription;

  constructor(
    private articlesService: ArticlesService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.article = this.articlesService.getLoadedArticleById(params['id']);
    });
  }
  
  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  onBack(): void {
    this.location.back();
  }

  articleExists(): boolean {
    return this.article == null ? false : true;
  }
}
