import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticlesControlsComponent } from './articles-controls/articles-controls.component';
import { ArticlesPageComponent } from './articles-page/articles-page.component';
import { AppCommonModule } from '../app-common/common.module';



@NgModule({
  declarations: [
    ArticleListComponent,
    ArticleDetailComponent,
    ArticlesComponent,
    ArticlesControlsComponent,
    ArticlesPageComponent
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    ArticlesRoutingModule
  ]
})
export class ArticlesModule { }
