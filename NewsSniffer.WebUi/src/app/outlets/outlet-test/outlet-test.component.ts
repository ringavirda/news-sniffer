import { Component, Input } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Article } from 'src/app/models/article';
import { Outlet } from '../../models/outlet';
import { OutletsService } from '../outlets.service';

@Component({
  selector: 'app-outlet-test',
  templateUrl: './outlet-test.component.html',
  styleUrls: ['./outlet-test.component.scss']
})
export class OutletTestComponent {
  @Input() outlet!: Outlet;
  testResults!: Article;
  testRunning: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(
    private outletsService: OutletsService
  ) {
    this.testRunning.next(false);
   }

  onExecute(): void {
    if (this.outlet != null) {
      this.testRunning.next(true);

      this.outletsService.performTestRequest(this.outlet).subscribe({
        next: data => {
          this.testResults =  data;
          this.testRunning.next(false);
        },
        error: error => {
          this.testResults = error.error;
          this.testRunning.next(false);
        }
      });
    }
  }
}
