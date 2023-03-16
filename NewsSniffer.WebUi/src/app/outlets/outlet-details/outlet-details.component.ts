import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { Outlet } from '../../models/outlet';
import { ActivatedRoute } from '@angular/router';
import { OutletsService } from '../outlets.service';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-outlet-details',
  templateUrl: './outlet-details.component.html',
  styleUrls: ['./outlet-details.component.scss']
})
export class OutletDetailsComponent implements OnInit {
  deleteRunning!: boolean;
  deleteSubj: BehaviorSubject<string> = new BehaviorSubject<string>("inactive");
  newFlcs: string = "";
  newSlcs: string = "";
  newSlts: string = "";
  outlet!: Outlet;
  updateRunning: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private outletsService: OutletsService
  ) { }

  onBack(): void {
    this.location.back();
  }

  onDelete(): void {
    if (confirm(`A you sure: { Delete outlet ${this.outlet.name} }`)) {
      this.outletsService.delete(this.outlet, this.deleteSubj);
    }
  }

  onFlcsApply(): void {
    this.outlet.flcs = this.newFlcs;
    this.newFlcs = "";
  }

  onHeaderLink(): void {
    window.open(this.outlet.link);
  }

  onSlcsApply(): void {
    this.outlet.slcs = this.newSlcs;
    this.newSlcs = "";
  }

  onSltsApply(): void {
    this.outlet.slts = this.newSlts;
    this.newSlts = "";
  }

  onUpdate(): void {
    if (confirm(`A you sure: { Update outlet ${this.outlet.name} }`)) {
      this.outletsService.update(this.outlet, this.updateRunning);
    }
  }

  outletExists(): boolean {
    return this.outlet == null ? false : true;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        let id = Number(params.get('id'));
        if (!isNaN(id)) {
          this.outlet = this.outletsService.getLoadedById(id);
        }
      }
    )

    this.deleteSubj.subscribe(data => {
      this.deleteRunning = data != "inactive" ? true : false;
      if (data == "completed") {
        this.onBack();
      }
    });
  }
}
