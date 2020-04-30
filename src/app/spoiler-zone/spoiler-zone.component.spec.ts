import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpoilerZoneComponent } from './spoiler-zone.component';

describe('SpoilerZoneComponent', () => {
  let component: SpoilerZoneComponent;
  let fixture: ComponentFixture<SpoilerZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpoilerZoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpoilerZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
