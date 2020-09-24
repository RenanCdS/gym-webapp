import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingRegisterPageComponent } from './training-register-page.component';

describe('TrainingRegisterPageComponent', () => {
  let component: TrainingRegisterPageComponent;
  let fixture: ComponentFixture<TrainingRegisterPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingRegisterPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingRegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
