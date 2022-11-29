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
export class ArticlesComponent implements OnInit {
  controls: ControlItem[] = [{
    type: "button",
    text: ["Update Backend"],
    style: "x-large bold",
    action: (stage) => {
      if (confirm("Are you sure: { Update Backend }\nThis process involves fetching and processing articles from known outlets. It may take some time.")) {
        this.articlesService.updateBackend(stage);
      }
    },
    stage: new BehaviorSubject<boolean>(false)
  }, {
    type: "button",
    text: ["Get All"],
    style: "large",
    action: (stage) => {
      this.articlesService.getAll(stage);
    },
    stage: new BehaviorSubject<boolean>(false)
  }, {
    type: "button",
    text: ["Delete All"],
    style: "large",
    action: (stage) => {
      if (confirm("Are you sure: { Delete All Artiles }")) {
        this.articlesService.deleteAll(stage);
      }
    },
    stage: new BehaviorSubject<boolean>(false)
  }, {
    type: "info",
    text: ["Filter by training marker:"],
    style: "",
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
    style: "",
    action: () => { },
    stage: new BehaviorSubject("")
  }, {
    type: "select",
    text: [
      "all",
      Impressions.none,
      Impressions.neuteral,
      Impressions.positive,
      Impressions.negative
    ],
    style: "",
    action: (stage) => {
      this.impressionFilter.next(stage);
    },
    stage: new BehaviorSubject<string>("all")
  }];

  itemsPerPage: number = 30;
  pageNumbers: number[] = [];
  section: string = "articles";

  markFilter: BehaviorSubject<string> = new BehaviorSubject<string>("all");
  impressionFilter: BehaviorSubject<string> = new BehaviorSubject<string>("all");

  constructor(
    private articlesService: ArticlesService
  ) { }

  ngOnInit(): void {
    this.articlesService.getAllFiltered().subscribe(data =>
      this.pageNumbers = [...Array(Math.ceil(data.length / this.itemsPerPage) + 2).keys()]
        .slice(1, -1)
    )
  }
}
