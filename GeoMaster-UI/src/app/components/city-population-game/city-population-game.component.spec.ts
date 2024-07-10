import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityPopulationGameComponent } from './city-population-game.component';

describe('CityPopulationGameComponent', () => {
  let component: CityPopulationGameComponent;
  let fixture: ComponentFixture<CityPopulationGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CityPopulationGameComponent]
    });
    fixture = TestBed.createComponent(CityPopulationGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
