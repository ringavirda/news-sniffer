import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletControlsComponent } from './outlet-controls.component';

describe('OutletControlsComponent', () => {
  let component: OutletControlsComponent;
  let fixture: ComponentFixture<OutletControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutletControlsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutletControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
