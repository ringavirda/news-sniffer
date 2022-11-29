import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SectionControlsComponent } from './section-controls/section-controls.component';
import { GenericButtonComponent } from './generic-button/generic-button.component';



@NgModule({
  declarations: [
    PaginationComponent,
    PageNotFoundComponent,
    SectionControlsComponent,
    GenericButtonComponent
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
    GenericButtonComponent
  ]
})
export class AppCommonModule { }
