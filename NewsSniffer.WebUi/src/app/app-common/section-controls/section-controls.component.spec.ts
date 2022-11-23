import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionControlsComponent } from './section-controls.component';

describe('SectionControlsComponent', () => {
  let component: SectionControlsComponent;
  let fixture: ComponentFixture<SectionControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionControlsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
