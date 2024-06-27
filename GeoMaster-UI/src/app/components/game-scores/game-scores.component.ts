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
    this.scoreService.getScoresByGameType(gameType).subscribe({
      next: (data) => {
        if (data.length === 0) {
          switch (gameType) {
            case 'Country population':
              this.countryPopulationNoDataMessage = `Brak wyników dla ${gameType}`;
              break;
            case 'Country surface area':
              this.countrySurfaceAreaNoDataMessage = `Brak wyników dla ${gameType}`;
              break;
            case 'City population':
              this.cityPopulationNoDataMessage = `Brak wyników dla ${gameType}`;
              break;
          }
        } else {
          this.countryPopulationNoDataMessage = '';
          this.countrySurfaceAreaNoDataMessage = '';
          this.cityPopulationNoDataMessage = '';
        }

        switch (gameType) {
          case 'Country-Population':
            this.countryPopulationScores = data;
            break;
          case 'Country-SurfaceArea':
            this.countrySurfaceAreaScores = data;
            break;
          case 'City-Population':
            this.cityPopulationScores = data;
            break;
        }

        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = 'Błąd podczas ładowania wyników. Spróbuj ponownie.';
        console.error(err);
      }
    });
  }

  onTabChange(event: any): void {
    const tabLabels = ['Country-Population', 'Country-SurfaceArea', 'City-Population'];
    const selectedGameType = tabLabels[event.index];
    this.loadScores(selectedGameType);
  }

}
