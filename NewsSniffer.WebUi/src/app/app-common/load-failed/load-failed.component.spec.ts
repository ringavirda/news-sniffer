import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadFailedComponent } from './load-failed.component';

describe('LoadFailedComponent', () => {
  let component: LoadFailedComponent;
  let fixture: ComponentFixture<LoadFailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadFailedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
