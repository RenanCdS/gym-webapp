import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachRegisterPageComponent } from './coach-register-page.component';

describe('CoachRegisterPageComponent', () => {
  let component: CoachRegisterPageComponent;
  let fixture: ComponentFixture<CoachRegisterPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachRegisterPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachRegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
