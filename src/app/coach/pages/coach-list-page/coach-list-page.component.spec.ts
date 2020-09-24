import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachListPageComponent } from './coach-list-page.component';

describe('CoachListPageComponent', () => {
  let component: CoachListPageComponent;
  let fixture: ComponentFixture<CoachListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
