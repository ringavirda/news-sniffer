import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-load-failed',
  templateUrl: './load-failed.component.html',
  styleUrls: ['./load-failed.component.scss']
})
export class LoadFailedComponent {
  @Input() caller!: string;
  @Input() showBackend!: boolean;
  @Input() filtering!: boolean;
}
