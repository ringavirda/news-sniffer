import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../articles.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  itemsPerPage: number = 30;
  pageNumbers: number[] = [];

  constructor(
    private articlesService: ArticlesService
  ) { }

  ngOnInit(): void {
    this.articlesService.getLoadedArticles().subscribe(data => 
      this.pageNumbers = [...Array(Math.ceil(data.length / this.itemsPerPage) + 2).keys()]
      .slice(1, -1)
      )
  }
}
