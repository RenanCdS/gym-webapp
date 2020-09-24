import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AthleteRegisterPageComponent } from './athlete-register-page.component';

describe('AthleteRegisterPageComponent', () => {
  let component: AthleteRegisterPageComponent;
  let fixture: ComponentFixture<AthleteRegisterPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AthleteRegisterPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AthleteRegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
