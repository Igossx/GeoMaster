import { Component } from '@angular/core';
import { GameScore } from 'src/app/models/game-score.model';
import { ScoreService } from 'src/app/services/score.service';

@Component({
  selector: 'app-game-scores',
  templateUrl: './game-scores.component.html',
  styleUrls: ['./game-scores.component.css']
})
export class GameScoresComponent {

  countryPopulationScores: GameScore[] = [];
  countrySurfaceAreaScores: GameScore[] = [];
  cityPopulationScores: GameScore[] = [];
  countryPopulationNoDataMessage: string = '';
  countrySurfaceAreaNoDataMessage: string = '';
  cityPopulationNoDataMessage: string = '';
  errorMessage: string = '';
  noDataMessage: string = '';

  constructor(private scoreService: ScoreService) { }

  ngOnInit(): void {
    this.loadScores('Country-Population');
  }

  loadScores(gameType: string): void {
    this.errorMessage = '';
    this.scoreService.getScoresByGameType(gameType).subscribe({
      next: (data) => {
        if (data.length === 0) {
          this.setNoDataMessage(gameType, `Brak wyników dla ${gameType}`);
        } else {
          this.clearNoDataMessage(gameType);
        }

        this.setScores(gameType, data);
      },
      error: (err) => {
        this.errorMessage = 'Błąd podczas ładowania wyników. Spróbuj ponownie.';
        console.error(err);
      }
    });
  }

  setNoDataMessage(gameType: string, message: string): void {
    switch (gameType) {
      case 'Country-Population':
        this.countryPopulationNoDataMessage = message;
        break;
      case 'Country-SurfaceArea':
        this.countrySurfaceAreaNoDataMessage = message;
        break;
      case 'City-Population':
        this.cityPopulationNoDataMessage = message;
        break;
    }
  }

  clearNoDataMessage(gameType: string): void {
    switch (gameType) {
      case 'Country-Population':
        this.countryPopulationNoDataMessage = '';
        break;
      case 'Country-SurfaceArea':
        this.countrySurfaceAreaNoDataMessage = '';
        break;
      case 'City-Population':
        this.cityPopulationNoDataMessage = '';
        break;
    }
  }

  setScores(gameType: string, scores: GameScore[]): void {
    switch (gameType) {
      case 'Country-Population':
        this.countryPopulationScores = scores;
        break;
      case 'Country-SurfaceArea':
        this.countrySurfaceAreaScores = scores;
        break;
      case 'City-Population':
        this.cityPopulationScores = scores;
        break;
    }
  }

  onTabChange(event: any): void {
    const selectedGameType = event.tab.textLabel;
    this.loadScores(selectedGameType);
  }

}
