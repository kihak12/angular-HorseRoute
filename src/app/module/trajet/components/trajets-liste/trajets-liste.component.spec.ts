import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrajetsListeComponent } from './trajets-liste.component';

describe('TrajetsListeComponent', () => {
  let component: TrajetsListeComponent;
  let fixture: ComponentFixture<TrajetsListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrajetsListeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrajetsListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
