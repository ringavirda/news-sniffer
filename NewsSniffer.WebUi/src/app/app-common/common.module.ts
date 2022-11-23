import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoadFailedComponent } from './load-failed/load-failed.component';
import { SectionControlsComponent } from './section-controls/section-controls.component';



@NgModule({
  declarations: [
    PaginationComponent,
    PageNotFoundComponent,
    LoadFailedComponent,
    SectionControlsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    PaginationComponent,
    PageNotFoundComponent,
    SectionControlsComponent,
    LoadFailedComponent
  ]
})
export class AppCommonModule { }
