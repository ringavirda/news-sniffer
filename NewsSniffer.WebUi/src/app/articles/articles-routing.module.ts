import { NgModule } from '@angular/core';
import { ChildActivationEnd, RouterModule, Routes } from '@angular/router';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticlesPageComponent } from './articles-page/articles-page.component';
import { ArticlesComponent } from './articles/articles.component';

const routes: Routes = [
  {
    path: "articles", 
    component: ArticlesComponent,
    children: [
      {path: "page/:id", component: ArticlesPageComponent },
    ]
  },
  { path: "articles/:id", component: ArticleDetailComponent },
  { path: "", redirectTo: "articles/page/1", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
