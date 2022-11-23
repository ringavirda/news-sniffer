import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticlesPageComponent } from './articles-page/articles-page.component';
import { AppCommonModule } from '../app-common/common.module';
import { ArticleListItemComponent } from './article-list-item/article-list-item.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ArticleListComponent,
    ArticleDetailComponent,
    ArticlesComponent,
    ArticlesPageComponent,
    ArticleListItemComponent
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    ArticlesRoutingModule,
    FormsModule
  ]
})
export class ArticlesModule { }
