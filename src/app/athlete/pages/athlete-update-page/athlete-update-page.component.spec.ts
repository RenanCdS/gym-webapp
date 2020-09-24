import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AthleteUpdatePageComponent } from './athlete-update-page.component';

describe('AthleteUpdatePageComponent', () => {
  let component: AthleteUpdatePageComponent;
  let fixture: ComponentFixture<AthleteUpdatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AthleteUpdatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AthleteUpdatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
