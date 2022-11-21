import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesControlsComponent } from './articles-controls.component';

describe('ArticlesControlsComponent', () => {
  let component: ArticlesControlsComponent;
  let fixture: ComponentFixture<ArticlesControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticlesControlsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticlesControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
