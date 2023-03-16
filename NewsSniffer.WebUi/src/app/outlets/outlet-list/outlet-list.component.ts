import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Outlet } from '../../models/outlet';
import { OutletsService } from '../outlets.service';

@Component({
  selector: 'app-outlet-list',
  templateUrl: './outlet-list.component.html',
  styleUrls: ['./outlet-list.component.scss']
})
export class OutletListComponent implements OnInit, OnDestroy {
  outlets: Outlet[] = [];

  outletsSub!: Subscription;

  constructor(
    private outletsService: OutletsService
  ) { }

  onLink(url: string) {
    window.open(url);
  }

  outletsExist(): boolean {
    return this.outlets.length > 0 ? true : false;
  }

  ngOnDestroy(): void {
    this.outletsSub.unsubscribe();
  }

  ngOnInit(): void {
    this.outletsSub = this.outletsService.getAllLoaded().subscribe(
      data => {
        this.outlets = data;
      }
    );
  }
}
