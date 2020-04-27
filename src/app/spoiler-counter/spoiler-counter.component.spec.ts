import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpoilerCounterComponent } from './spoiler-counter.component';

describe('SpoilerCounterComponent', () => {
  let component: SpoilerCounterComponent;
  let fixture: ComponentFixture<SpoilerCounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpoilerCounterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpoilerCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
