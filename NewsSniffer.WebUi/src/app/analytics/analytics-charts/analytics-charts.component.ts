import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import Highcharts3d from 'highcharts/highcharts-3d';
Highcharts3d(Highcharts);
import { Impressions } from 'src/app/app-common/impressions';
import { Analytics } from 'src/app/models/analytics';
import { AnalyticsService } from '../analytics.service';

@Component({
  selector: 'app-analytics-charts',
  templateUrl: './analytics-charts.component.html',
  styleUrls: ['./analytics-charts.component.scss']
})
export class AnalyticsChartsComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;

  public analytics!: Analytics;

  constructor(
    private analyticsService: AnalyticsService
  ) { }

  updateCharts(): void {
    if (this.analytics?.perTime == undefined) return;

    let perDaySerries: Highcharts.SeriesOptionsType[] = [];
    let xAxis: Highcharts.XAxisOptions[] = [];

    let categories = [...new Set(this.analytics.perTime.flatMap(o => o.daily.map(s => new Date(s.date))
    ).sort((t1, t2) => t1.getTime() - t2.getTime()).map(d => d.toDateString()))];

    this.analytics.perTime.map(outlet => {
      xAxis.push({
        id: outlet.outlet,
        margin: 20,
        visible: false,
        categories: categories
      });

      perDaySerries.push({
        type: "area",
        xAxis: outlet.outlet,
        name: outlet.outlet + " " + Impressions.positive,
        data: categories.map(c => {
          let found = outlet.daily.find(d => new Date(d.date).toDateString() == c);
          return found ? found.value.positive : 0;
        }),
        color: "green"
      });

      perDaySerries.push({
        type: "area",
        xAxis: outlet.outlet,
        name: outlet.outlet + " " + Impressions.negative,
        data: categories.map(c => {
          let found = outlet.daily.find(d => new Date(d.date).toDateString() == c);
          return found ? found.value.negative : 0;
        }),
        color: "brown"
      });

      perDaySerries.push({
        type: "area",
        xAxis: outlet.outlet,
        name: outlet.outlet + " " + Impressions.neuteral,
        data: categories.map(c => {
          let found = outlet.daily.find(d => new Date(d.date).toDateString() == c);
          return found ? found.value.neuteral : 0;
        }),
        color: "yellow"
      });
    });

    xAxis[0].visible = true;

    Highcharts.chart({
      chart: {
        renderTo: "perDayContainer",
        type: 'area',

      },

      credits: {
        enabled: false
      },

      title: {
        text: undefined
      },

      legend: {
        enabled: false
      },

      plotOptions: {
        area: {
          stacking: "normal",
          fillOpacity: 0.5
        }
      },

      series: perDaySerries,
      xAxis: xAxis,
      yAxis: {
        title: undefined
      }
    });

    Highcharts.chart({
      chart: {
        renderTo: "overallContainer",
        type: 'pie',
      },

      credits: {
        enabled: false
      },

      title: {
        text: undefined
      },

      legend: {
        enabled: false
      },

      series: [
        {
          type: "pie",
          name: "Overall",
          data: [{
            name: "Positive",
            y: this.analytics.overall.positive
          }, {
            name: "Negative",
            y: this.analytics.overall.negative
          }, {
            name: "Neuteral",
            y: this.analytics.overall.neuteral
          },]
        }
      ]
    });

    Highcharts.chart({
      chart: {
        renderTo: "changeContainer",
        type: 'line',
      },

      credits: {
        enabled: false
      },

      title: {
        text: undefined
      },

      legend: {
        enabled: false
      },

      series: [{
        type: "line",
        name: "Impressions Change",
        data: categories.map(cat => {
          let impression: number = 0;
          this.analytics.perTime.forEach(outlet => {
            let found = outlet.daily.find(d => new Date(d.date).toDateString() == cat);
            impression += found 
              ? (found.value.positive - found.value.negative) * Math.sqrt(found.value.neuteral) 
              : 0;
          })
          return impression;
        })
      }],
      xAxis: {
        ...xAxis[0],
      },
      yAxis: {
        title: undefined,
        visible: true
      }
    });
  }

  ngOnInit(): void {
    this.analyticsService.getLoaded().subscribe(data => {
      this.analytics = data;
      this.updateCharts()
    });
  }
}
