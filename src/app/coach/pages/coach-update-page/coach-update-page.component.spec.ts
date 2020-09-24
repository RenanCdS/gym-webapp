import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachUpdatePageComponent } from './coach-update-page.component';

describe('CoachUpdatePageComponent', () => {
  let component: CoachUpdatePageComponent;
  let fixture: ComponentFixture<CoachUpdatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachUpdatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachUpdatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
