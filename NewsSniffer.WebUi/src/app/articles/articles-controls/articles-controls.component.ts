import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ArticlesService } from '../articles.service';

@Component({
  selector: 'app-articles-controls',
  templateUrl: './articles-controls.component.html',
  styleUrls: ['./articles-controls.component.scss']
})
export class ArticlesControlsComponent implements OnInit, OnDestroy {
  updateRunning: boolean = false;
  getAllRunning: boolean = false;

  private updateSubj: Subject<boolean> = new Subject<boolean>();
  private updateSub!: Subscription;
  private getAllSubj: Subject<boolean> = new Subject<boolean>();
  private getAllSub!: Subscription;
  
  constructor(
    private articlesService: ArticlesService
  ) { 
    this.updateSubj.next(false);
    this.getAllSubj.next(false);
  }

  ngOnInit(): void {
    this.updateSub = this.updateSubj.subscribe(data => this.updateRunning = data);
    this.getAllSub = this.getAllSubj.subscribe(data => this.getAllRunning = data);
  }

  ngOnDestroy(): void {
    this.updateSub.unsubscribe();
    this.getAllSub.unsubscribe();
  }
  
  onUpdateArticles() {
    this.articlesService.UpdateRequest(this.updateSubj);
  }
  onGetAll() {
    this.articlesService.getAllRequest(this.getAllSubj);
  }
}
