import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { Outlet } from '../../models/outlet';
import { OutletsService } from '../outlets.service';

@Component({
  selector: 'app-outlet-test',
  templateUrl: './outlet-test.component.html',
  styleUrls: ['./outlet-test.component.scss']
})
export class OutletTestComponent {
  testResults: string = "";
  testRunning: Subject<boolean> = new Subject<boolean>();

  @Input() outlet!: Outlet;

  constructor(
    private outletsService: OutletsService
  ) {
    this.testRunning.next(false);
   }

  onExecute(): void {
    if (this.outlet != null) {
      this.testRunning.next(true);

      this.outletsService.performTestOnConfig(this.outlet).subscribe({
        next: data => {
          this.testResults = JSON.stringify(data);
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
