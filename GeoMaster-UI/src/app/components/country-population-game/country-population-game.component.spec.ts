import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryPopulationGameComponent } from './country-population-game.component';

describe('CountryPopulationGameComponent', () => {
  let component: CountryPopulationGameComponent;
  let fixture: ComponentFixture<CountryPopulationGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CountryPopulationGameComponent]
    });
    fixture = TestBed.createComponent(CountryPopulationGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
