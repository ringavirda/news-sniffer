import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../article';
import { ArticlesService } from '../articles.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})


export class ArticleListComponent implements OnInit {
  @Input() articles: Article[] = [];
  
  constructor(
    private articlesService: ArticlesService
  ) { }

  ngOnInit() {
  }
}
