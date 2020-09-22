import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonificationComponent } from './bonification.component';

describe('BonificationComponent', () => {
  let component: BonificationComponent;
  let fixture: ComponentFixture<BonificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
