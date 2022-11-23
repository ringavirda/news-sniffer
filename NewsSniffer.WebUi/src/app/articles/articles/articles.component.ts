import { NONE_TYPE } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Impressions } from 'src/app/app-common/impressions';
import { ControlItem } from 'src/app/app-common/section-controls/control-item';
import { TrainingMarkers } from 'src/app/app-common/training-markers';
import { ArticlesService } from '../articles.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit, OnDestroy {
  controls: ControlItem[] = [{
    type: "button",
    text: ["Update"],
    style: "large",
    action: (stage) => {
      this.articlesService.updateRequest(stage as BehaviorSubject<boolean>);
    },
    stage: new BehaviorSubject<boolean>(false)
  }, {
    type: "button",
    text: ["GetAll"],
    style: "normal",
    action: (stage) => {
      this.articlesService.getAllRequest(stage as BehaviorSubject<boolean>);
    },
    stage: new BehaviorSubject<boolean>(false)
  }, {
    type: "info",
    text: ["Filter by training marker:"],
    style: "large",
    action: () => { },
    stage: new BehaviorSubject("")
  }, {
    type: "select",
    text: [
      "all",
      TrainingMarkers.unmarked,
      TrainingMarkers.training,
      TrainingMarkers.testing
    ],
    style: "",
    action: (stage) => {
      this.markFilter.next(stage);
    },
    stage: new BehaviorSubject<string>("all")
  }, {
    type: "info",
    text: ["Filter by Impression:"],
    style: "large",
    action: () => { },
    stage: new BehaviorSubject("")
  }, {
    type: "select",
    text: [
      "all",
      Impressions.none,
      Impressions.neuteral,
      Impressions.good,
      Impressions.bad
    ],
    style: "",
    action: (stage) => {
      this.impressionFilter.next(stage);
    },
    stage: new BehaviorSubject<string>("all")
  }];

  itemsPerPage: number = 30;
  pageNumbers: number[] = [];

  markFilter: BehaviorSubject<string> = new BehaviorSubject<string>("all");
  impressionFilter: BehaviorSubject<string> = new BehaviorSubject<string>("all");

  private articleSub!: Subscription;

  constructor(
    private articlesService: ArticlesService
  ) { }

  ngOnInit(): void {
    this.articleSub = this.articlesService.getFilteredLoadedArticles().subscribe(data =>
      this.pageNumbers = [...Array(Math.ceil(data.length / this.itemsPerPage) + 2).keys()]
        .slice(1, -1)
    )
  }

  ngOnDestroy(): void {
    this.articleSub.unsubscribe();
    this.markFilter.unsubscribe();
    this.impressionFilter.unsubscribe();
  }
}
