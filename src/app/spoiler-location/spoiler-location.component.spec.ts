import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpoilerLocationComponent } from './spoiler-location.component';

describe('SpoilerItemComponent', () => {
  let component: SpoilerLocationComponent;
  let fixture: ComponentFixture<SpoilerLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpoilerLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpoilerLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
