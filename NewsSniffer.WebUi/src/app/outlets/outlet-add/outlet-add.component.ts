import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Outlet } from '../../models/outlet';
import { OutletsService } from '../outlets.service';

@Component({
  selector: 'app-outlet-add',
  templateUrl: './outlet-add.component.html',
  styleUrls: ['./outlet-add.component.scss']
})
export class OutletAddComponent implements OnInit, OnDestroy {
  createRunning: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  newCode: BehaviorSubject<string> = new BehaviorSubject<string>("");
  newCodeSub!: Subscription;
  newFLCS: BehaviorSubject<string> = new BehaviorSubject<string>("");
  newFLCSSub!: Subscription;
  newLink: BehaviorSubject<string> = new BehaviorSubject<string>("");
  newLinkSub!: Subscription;
  newName: BehaviorSubject<string> = new BehaviorSubject<string>("");
  newNameSub!: Subscription;
  newSLCS: BehaviorSubject<string> = new BehaviorSubject<string>("");
  newSLCSSub!: Subscription;
  newSLTS: BehaviorSubject<string> = new BehaviorSubject<string>("");
  newSLTSSub!: Subscription;
  outlet: Outlet = {
    id: 0,
    name: "",
    code: "",
    link: "",
    flcs: "",
    slcs: "",
    slts: ""
  };
  constructor(
    private outletsService: OutletsService
  ) { }

  blankOutlet(): void {
    this.newName.next("");
    this.newLink.next("");
    this.newCode.next("");
    this.newFLCS.next("");
    this.newSLCS.next("");
    this.newSLTS.next("");
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
    this.outletsService.create(this.outlet, this.createRunning);
    this.blankOutlet();
  }

  ngOnDestroy(): void {
    this.newNameSub.unsubscribe();
    this.newCodeSub.unsubscribe();
    this.newLinkSub.unsubscribe();
    this.newFLCSSub.unsubscribe();
    this.newSLCSSub.unsubscribe();
    this.newSLTSSub.unsubscribe();
  }

  ngOnInit(): void {
    this.newNameSub = this.newName.subscribe(data => this.outlet.name = data);
    this.newCodeSub = this.newCode.subscribe(data => this.outlet.code = data);
    this.newLinkSub = this.newLink.subscribe(data => this.outlet.link = data);
    this.newFLCSSub = this.newFLCS.subscribe(data => this.outlet.flcs = data);
    this.newSLCSSub = this.newSLCS.subscribe(data => this.outlet.slcs = data);
    this.newSLTSSub = this.newSLTS.subscribe(data => this.outlet.slts = data);
  }
}
