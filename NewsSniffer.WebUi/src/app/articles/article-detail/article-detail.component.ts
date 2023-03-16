import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Article, Ngram } from '../../models/article';
import { ArticlesService } from '../articles.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit  {
  article!: Article;
  deleteRunning: boolean = false;
  deleteSubj: BehaviorSubject<string> = new BehaviorSubject<string>("inactive");
  showBody: boolean = true;
  showNgram: boolean = false;

  showPageNotFound: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(
    private articlesService: ArticlesService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  public articleExists(): boolean {
    return this.article == null ? false : true;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.articlesService.getById(params['id'], this.showPageNotFound)
        .subscribe(data => {
          data.date = new Date(data.date);
          this.article = data;
        } );
    });

    this.deleteSubj.subscribe(data => {
      this.deleteRunning = data != "inactive" ? true : false;
      if (data == "completed") {
        this.location.back();
      }
    });
  }

  public onArticle(): void {
    this.showBody = true,
    this.showNgram = false;
  }

  public onDelete(): void {
    if (confirm("Are you sure: { Delete Article }")) {
      this.articlesService.delete(this.article, this.deleteSubj);
    }
  }

  public onNgram(): void {
    this.showNgram = true,
    this.showBody = false;
  }
}
