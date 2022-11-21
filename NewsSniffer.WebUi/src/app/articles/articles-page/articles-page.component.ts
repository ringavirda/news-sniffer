import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArticlesService } from '../articles.service';
import { Page } from '../page';

@Component({
  selector: 'app-articles-page',
  templateUrl: './articles-page.component.html',
  styleUrls: ['./articles-page.component.scss']
})
export class ArticlesPageComponent {
  itemsPerPage: number = 30;
  page: Page = { articles: [] };
  pageNumber!: number;
  routeSub!: Subscription;
  articlesSub!: Subscription;

  constructor(
    private articlesService: ArticlesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.pageNumber = Number(params.get("id"));
      this.articlesService.getAllArticles().subscribe(data => 
        this.page.articles = data.slice(
          (this.pageNumber - 1) * this.itemsPerPage, this.pageNumber * this.itemsPerPage)
          )
      
    });
  }
}
