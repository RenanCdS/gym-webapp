import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseRegisterComponent } from './exercise-register.component';

describe('ExerciseRegisterComponent', () => {
  let component: ExerciseRegisterComponent;
  let fixture: ComponentFixture<ExerciseRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExerciseRegisterComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
