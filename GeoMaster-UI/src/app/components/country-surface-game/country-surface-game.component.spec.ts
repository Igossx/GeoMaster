import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrySurfaceGameComponent } from './country-surface-game.component';

describe('CountrySurfaceGameComponent', () => {
  let component: CountrySurfaceGameComponent;
  let fixture: ComponentFixture<CountrySurfaceGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CountrySurfaceGameComponent]
    });
    fixture = TestBed.createComponent(CountrySurfaceGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
