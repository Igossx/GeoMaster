import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameScoresComponent } from './game-scores.component';

describe('GameScoresComponent', () => {
  let component: GameScoresComponent;
  let fixture: ComponentFixture<GameScoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameScoresComponent]
    });
    fixture = TestBed.createComponent(GameScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
