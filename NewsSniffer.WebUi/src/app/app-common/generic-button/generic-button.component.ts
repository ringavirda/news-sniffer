import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-generic-button',
  templateUrl: './generic-button.component.html',
  styleUrls: ['./generic-button.component.scss']
})
export class GenericButtonComponent {
  @Input() content!: string; 
  @Input() style!: string;
  @Input() disable: boolean = false;
  @Input() disableAsync!: BehaviorSubject<boolean>;
}
