import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAthletesPageComponent } from './my-athletes-page.component';

describe('MyAthletesPageComponent', () => {
  let component: MyAthletesPageComponent;
  let fixture: ComponentFixture<MyAthletesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAthletesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAthletesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
