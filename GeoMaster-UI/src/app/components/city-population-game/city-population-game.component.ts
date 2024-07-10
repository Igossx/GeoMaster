import { Component } from '@angular/core';
import { CityPopulation } from 'src/app/models/city-population.model';
import { GameScore } from 'src/app/models/game-score.model';
import { CityService } from 'src/app/services/city.service';
import { ScoreService } from 'src/app/services/score.service';

@Component({
  selector: 'app-city-population-game',
  templateUrl: './city-population-game.component.html',
  styleUrls: ['./city-population-game.component.css']
})
export class CityPopulationGameComponent {
  city1!: CityPopulation;
  city2!: CityPopulation;
  score: number = 0;
  errorMessage: string = '';
  successMessage: string = '';
  gameStarted: boolean = false;
  gameOver: boolean = false;
  showPopulation: boolean = false;
  isBlocked: boolean = false;
  correctChoice: boolean | null = null;
  selectedCity: CityPopulation | null = null;
  choiceMade: boolean = false;
  timeElapsed: number = 0;
  timerInterval: any;
  username: string = '';
  showSaveResultForm: boolean = false;
  scoreSaved: boolean = false;

  constructor(private countryService: CityService, private scoreService: ScoreService) { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    clearInterval(this.timerInterval);
  }

  startGame(): void {
    this.gameStarted = true;
    this.gameOver = false;
    this.score = 0;
    this.timeElapsed = 0;
    this.successMessage = '';
    this.scoreSaved = false;
    this.startTimer();
    this.loadNewCities();
  }

  startTimer(): void {
    this.timerInterval = setInterval(() => {
      this.timeElapsed++;
    }, 1000);
  }

  stopTimer(): void {
    clearInterval(this.timerInterval);
  }

  loadNewCities(): void {
    this.countryService.getTwoRandomCitiesWithPopulation().subscribe({
      next: (data) => {
        this.city1 = data.city1;
        this.city2 = data.city2;
        this.resetSelection();
      },
      error: (err) => {
        this.errorMessage = 'Błąd podczas ładowania danych. Spróbuj ponownie.';
        console.error(err);
      }
    });
  }

  resetSelection(): void {
    this.selectedCity = null;
    this.correctChoice = null;
    this.showPopulation = false;
    this.isBlocked = false;
    this.choiceMade = false;
    this.errorMessage = '';
  }

  selectCity(selectedCity: CityPopulation): void {
    if (this.isBlocked) {
      return;
    }

    this.selectedCity = selectedCity;
    this.showPopulation = true;
    this.isBlocked = true;
    this.choiceMade = true;

    this.correctChoice = selectedCity.population >= Math.max(this.city1.population, this.city2.population);

    setTimeout(() => {
      this.handleSelectionResult();
    }, 3500);
  }

  submitScore(): void {
    if (this.username && !this.scoreSaved) {

      const gameScore: GameScore = {
        id: '',
        score: this.score,
        gameTime: this.timeElapsed,
        username: this.username,
        gameType: 'City-Population',
        date: '2024-06-26'
      };

      this.scoreService.saveGameResult(gameScore).subscribe({
        next: response => {
          this.successMessage = 'Wynik prawidłowo zapisany';
          this.scoreSaved = true;
          console.log('Wynik zapisany:', response);
        },
        error: err => {
          console.error('Error:', err);
          this.errorMessage = 'Błąd podczas zapisu danych. Spróbuj ponownie.';
        }
      });
    } else if (this.scoreSaved) {
      this.successMessage = 'Wynik już został zapisany';
    } else {
      this.errorMessage = 'Nazwa użytkownika nie może być pusta.';
    }
  }

  handleSelectionResult(): void {
    if (this.correctChoice) {
      this.score++;
      this.loadNewCities();
    } else {
      this.endGame();
    }
  }

  endGame(): void {
    this.stopTimer();
    this.gameOver = true;
    this.gameStarted = false;
  }

  toggleSaveForm() {
    this.showSaveResultForm = !this.showSaveResultForm;
    this.successMessage = '';
  }
}
