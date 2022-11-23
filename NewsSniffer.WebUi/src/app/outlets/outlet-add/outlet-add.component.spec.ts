import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletAddComponent } from './outlet-add.component';

describe('OutletAddComponent', () => {
  let component: OutletAddComponent;
  let fixture: ComponentFixture<OutletAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutletAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutletAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
