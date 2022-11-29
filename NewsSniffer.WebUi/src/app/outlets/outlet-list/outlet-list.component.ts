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

  private outletsSub!: Subscription;

  constructor(
    private outletsService: OutletsService
  ) { }
  
  ngOnInit(): void {
    this.outletsSub = this.outletsService.getAllLoaded().subscribe(
      data => {
        this.outlets = data;
      }
    );
  }
  
  ngOnDestroy(): void {
    this.outletsSub.unsubscribe();
  }

  onLink(url: string) {
    window.open(url);
  }

  outletsExist(): boolean {
    return this.outlets.length > 0 ? true : false;
  }
}
