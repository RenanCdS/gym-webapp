import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizedTrainingPageComponent } from './finalized-training-page.component';

describe('FinalizedTrainingPageComponent', () => {
  let component: FinalizedTrainingPageComponent;
  let fixture: ComponentFixture<FinalizedTrainingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalizedTrainingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizedTrainingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
