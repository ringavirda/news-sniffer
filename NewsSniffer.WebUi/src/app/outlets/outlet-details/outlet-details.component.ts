import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { Outlet } from '../outlet';
import { ActivatedRoute } from '@angular/router';
import { OutletsService } from '../outlets.service';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-outlet-details',
  templateUrl: './outlet-details.component.html',
  styleUrls: ['./outlet-details.component.scss']
})
export class OutletDetailsComponent implements OnInit, OnDestroy {
  outlet!: Outlet;
  deleteRunning!: boolean;
  updateRunning: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  newFlcs: string = "";
  newSlcs: string = "";
  newSlts: string = "";
  
  private routeSub!: Subscription;
  private deleteSub!: Subscription;
  private deleteSubj: BehaviorSubject<string> = new BehaviorSubject<string>("inactive");
  
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private outletsService: OutletsService
  ) { }

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(
      params => {
        let id = Number(params.get('id'));
        if (id != NaN) {
          this.outlet = this.outletsService.getLoadedOutletById(id);
        }
      }
    )
    this.deleteSub = this.deleteSubj.subscribe(data => {
      this.deleteRunning = data != "inactive" ? true : false;
      if (data == "completed") {
        this.onBack();
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.deleteSub.unsubscribe();
  }

  outletExists(): boolean {
    return this.outlet == null ? false : true;
  }

  onHeaderLink(): void {
    window.open(this.outlet.link);
  }

  onBack(): void {
    this.location.back();
  }

  onUpdate(): void {
    this.outletsService.UpdateOutlet(this.outlet, this.updateRunning);
  }

  onDelete(): void {
    this.outletsService.DeleteOutlet(this.outlet, this.deleteSubj);
  }

  onFlcsApply(): void {
    console.log(this.newFlcs)
    this.outlet.flcs = this.newFlcs;
    this.newFlcs = "";
  }
  onSlcsApply(): void {
    this.outlet.slcs = this.newSlcs;
    this.newSlcs = "";
  }
  onSltsApply(): void {
    this.outlet.slts = this.newSlts;
    this.newSlts = "";
  }
}
