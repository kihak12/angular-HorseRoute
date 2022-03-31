import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrajetInfoComponent } from './trajet-info.component';

describe('TrajetInfoComponent', () => {
  let component: TrajetInfoComponent;
  let fixture: ComponentFixture<TrajetInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrajetInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrajetInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
