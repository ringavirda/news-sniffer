import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Outlet } from '../outlet';
import { OutletsService } from '../outlets.service';

@Component({
  selector: 'app-outlet-add',
  templateUrl: './outlet-add.component.html',
  styleUrls: ['./outlet-add.component.scss']
})
export class OutletAddComponent implements OnInit, OnDestroy {
  outlet: Outlet;

  newName: BehaviorSubject<string> = new BehaviorSubject<string>("");
  newCode: BehaviorSubject<string> = new BehaviorSubject<string>("");
  newLink: BehaviorSubject<string> = new BehaviorSubject<string>("");
  newFLCS: BehaviorSubject<string> = new BehaviorSubject<string>("");
  newSLCS: BehaviorSubject<string> = new BehaviorSubject<string>("");
  newSLTS: BehaviorSubject<string> = new BehaviorSubject<string>("");

  createRunning: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private newNameSub!: Subscription;
  private newCodeSub!: Subscription;
  private newLinkSub!: Subscription;
  private newFLCSSub!: Subscription;
  private newSLCSSub!: Subscription;
  private newSLTSSub!: Subscription;

  constructor(
    private outletsService: OutletsService
  ) {
    this.outlet = {
      id: 0,
      name: "",
      code: "",
      link: "",
      flcs: "",
      slcs: "",
      slts: ""
    };
  }

  ngOnInit(): void {
    this.newNameSub = this.newName.subscribe(data => this.outlet.name = data);
    this.newCodeSub = this.newCode.subscribe(data => this.outlet.code = data);
    this.newLinkSub = this.newLink.subscribe(data => this.outlet.link = data);
    this.newFLCSSub = this.newFLCS.subscribe(data => this.outlet.flcs = data);
    this.newSLCSSub = this.newSLCS.subscribe(data => this.outlet.slcs = data);
    this.newSLTSSub = this.newSLTS.subscribe(data => this.outlet.slts = data);
  }

  ngOnDestroy(): void {
    this.newNameSub.unsubscribe();
    this.newCodeSub.unsubscribe();
    this.newLinkSub.unsubscribe();
    this.newFLCSSub.unsubscribe();
    this.newSLCSSub.unsubscribe();
    this.newSLTSSub.unsubscribe();
  }

  isOutletReady(): boolean {
    return this.outlet.name === "" ||
    this.outlet.code === "" ||
    this.outlet.link === "" ||
    this.outlet.flcs === "" ||
    this.outlet.slcs === "" ||
    this.outlet.slts === "";
  }

  onCreateNew(): void {
    this.outletsService.createOutlet(this.outlet, this.createRunning);
  }
}
