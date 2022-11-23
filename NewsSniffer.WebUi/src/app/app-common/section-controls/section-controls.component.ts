import { Component, Input } from '@angular/core';
import { ControlItem } from './control-item';

@Component({
  selector: 'app-section-controls',
  templateUrl: './section-controls.component.html',
  styleUrls: ['./section-controls.component.scss']
})
export class SectionControlsComponent {
  @Input() controls: ControlItem[] = [];
}
