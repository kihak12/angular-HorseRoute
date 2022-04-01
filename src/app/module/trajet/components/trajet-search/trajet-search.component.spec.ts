import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrajetSearchComponent } from './trajet-search.component';

describe('TrajetSearchComponent', () => {
  let component: TrajetSearchComponent;
  let fixture: ComponentFixture<TrajetSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrajetSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrajetSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
