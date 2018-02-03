import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CottageDetailComponent } from './cottage-detail.component';

describe('CottageDetailComponent', () => {
  let component: CottageDetailComponent;
  let fixture: ComponentFixture<CottageDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CottageDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CottageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
