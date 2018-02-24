import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetadditionComponent } from './setaddition.component';

describe('SetadditionComponent', () => {
  let component: SetadditionComponent;
  let fixture: ComponentFixture<SetadditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetadditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetadditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
