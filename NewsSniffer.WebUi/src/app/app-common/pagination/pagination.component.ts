import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { map, Subscription } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() itemsPerPage: number = 0;
  @Input() pageNumbers: number[] = [];
  @Input() section!: string;

  currentPage!: number;
  lastPageNumber!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.lastPageNumber = this.pageNumbers.length != 1 ? this.pageNumbers[this.pageNumbers.length - 1] : 1;
    this.route.paramMap.subscribe(params => {
      this.currentPage = Number(params.get("id"));
    });
  }

  onNext(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this.router.navigate([this.section, "page", this.currentPage < this.lastPageNumber
      ? this.currentPage + 1
      : this.lastPageNumber])
  }

  onPrev(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this.router.navigate([this.section, "page", this.currentPage > 1
      ? this.currentPage - 1
      : 1])
  }

  onPageChange(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this.router.navigate([this.section, "page", this.currentPage ]);
  }
}

