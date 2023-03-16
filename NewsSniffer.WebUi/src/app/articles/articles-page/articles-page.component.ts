import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Article } from '../../models/article';
import { ArticlesService } from '../articles.service';

@Component({
  selector: 'app-articles-page',
  templateUrl: './articles-page.component.html',
  styleUrls: ['./articles-page.component.scss']
})
export class ArticlesPageComponent implements OnInit {
  articles: Article[] = [];
  @Input() impressionFilter!: BehaviorSubject<string>;
  @Input() itemsPerPage!: number;
  @Input() markFilter!: BehaviorSubject<string>;
  pageNumber: number = 1;
  showFailed = {
    show: true,
    filtering: false,
    backendFailed: true
  };
  constructor(
    private articlesService: ArticlesService,
    private route: ActivatedRoute
  ) { }

  articlesExist(): boolean {
    return this.articles.length == 0 ? false : true;
  }

  getArticlesForCurrentPage(articles: Article[]): Article[] {
    return articles.slice(
      (this.pageNumber - 1) * this.itemsPerPage,
      this.pageNumber * this.itemsPerPage);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.pageNumber = Number(params.get("id"));

      this.articlesService.getAllLoaded().subscribe(data => {
        if (data.length > 0) {
          this.showFailed.show = false;
          this.showFailed.backendFailed = false;
        } else {
          this.showFailed.show = true;
          this.showFailed.backendFailed = true;
        }
      });

      this.articlesService.getAllFiltered().subscribe(data => {
        if (data.length > 0) {
          this.showFailed.show = false;
          this.showFailed.filtering = false;
          data.forEach(article => {
            article.date = new Date(article.date);
          });
          this.articles = this.getArticlesForCurrentPage(data);
        } else {
          this.showFailed.show = true;
          this.showFailed.filtering = true;
          this.articles = [];
        }
      });
    });

    this.markFilter.subscribe(data => {
      this.articlesService.applyFilters(this.markFilter.getValue(), null);
    });
    
    this.impressionFilter.subscribe(data => {
      this.articlesService.applyFilters(null, this.impressionFilter.getValue());
    });
  }
}
