import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericErrorPageComponent } from './generic-error-page.component';

describe('GenericErrorPageComponent', () => {
  let component: GenericErrorPageComponent;
  let fixture: ComponentFixture<GenericErrorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericErrorPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericErrorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
