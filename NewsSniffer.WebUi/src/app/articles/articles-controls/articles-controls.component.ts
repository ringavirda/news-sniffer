import { Component } from '@angular/core';
import { ArticlesService } from '../articles.service';

@Component({
  selector: 'app-articles-controls',
  templateUrl: './articles-controls.component.html',
  styleUrls: ['./articles-controls.component.scss']
})
export class ArticlesControlsComponent {

  constructor(
    private articlesService: ArticlesService
  ) { }

  onUpdateArticles() {
    this.articlesService.UpdateArticles();
  }
}
