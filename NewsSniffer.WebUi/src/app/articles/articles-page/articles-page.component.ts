import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Article } from '../article';
import { ArticlesService } from '../articles.service';

@Component({
  selector: 'app-articles-page',
  templateUrl: './articles-page.component.html',
  styleUrls: ['./articles-page.component.scss']
})
export class ArticlesPageComponent implements OnInit, OnDestroy {
  itemsPerPage: number = 30;
  articles: Article[] = [];
  showFailed: boolean = false;

  private pageNumber: number = 0;
  private routeSub!: Subscription;
  private articlesSub!: Subscription;

  constructor(
    private articlesService: ArticlesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(params => {
      this.pageNumber = Number(params.get("id"));
    })

    this.articlesSub = this.articlesService.getLoadedArticles().subscribe(data => {
      if (data.length > 0) {
        this.showFailed = false;
        this.articles = data.slice (
          (this.pageNumber - 1) * this.itemsPerPage,
          this.pageNumber * this.itemsPerPage);
      } else {
        this.showFailed = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.articlesSub.unsubscribe();
  }

  articlesExist(): boolean {
    return this.articles.length == 0 ? false : true;
  }
}
