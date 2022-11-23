import { NgModule } from '@angular/core';
import { ChildActivationEnd, RouterModule, Routes } from '@angular/router';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticlesPageComponent } from './articles-page/articles-page.component';
import { ArticlesComponent } from './articles/articles.component';

const routes: Routes = [
  {
    path: "articles",
    redirectTo: "articles/page/1",
    pathMatch: "full",
  },
  {
    path: "articles",
    children: [
      { path: "page/:id", component: ArticlesComponent },
      { path: ":id", component: ArticleDetailComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
