import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageZonesComponent } from './manage-zones.component';

describe('ManageZonesComponent', () => {
  let component: ManageZonesComponent;
  let fixture: ComponentFixture<ManageZonesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageZonesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageZonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
