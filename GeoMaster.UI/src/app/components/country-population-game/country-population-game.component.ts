import { Component, OnInit } from '@angular/core';
import { CountryPopulation } from 'src/app/models/country-population.model';
import { GameScore } from 'src/app/models/game-score.model';
import { CountryService } from 'src/app/services/country.service';
import { ScoreService } from 'src/app/services/score.service';

@Component({
  selector: 'app-country-population-game',
  templateUrl: './country-population-game.component.html',
  styleUrls: ['./country-population-game.component.css']
})
export class CountryPopulationGameComponent implements OnInit {

  country1!: CountryPopulation;
  country2!: CountryPopulation;
  score: number = 0;
  errorMessage: string = '';
  successMessage: string = '';
  gameStarted: boolean = false;
  gameOver: boolean = false;
  showPopulation: boolean = false;
  isBlocked: boolean = false;
  correctChoice: boolean | null = null;
  selectedCountry: CountryPopulation | null = null;
  choiceMade: boolean = false;
  timeElapsed: number = 0;
  timerInterval: any;
  username: string = '';
  showSaveResultForm: boolean = false;
  scoreSaved: boolean = false;

  constructor(private countryService: CountryService, private scoreService: ScoreService) { }

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
    this.loadNewCountries();
  }

  startTimer(): void {
    this.timerInterval = setInterval(() => {
      this.timeElapsed++;
    }, 1000);
  }

  stopTimer(): void {
    clearInterval(this.timerInterval);
  }

  loadNewCountries(): void {
    this.countryService.getTwoRandomCountriesWithPopulation().subscribe({
      next: data => {
        this.country1 = data.country1;
        this.country2 = data.country2;
        this.resetSelection();
      },
      error: err => {
        this.errorMessage = 'Błąd podczas ładowania danych. Spróbuj ponownie.';
        console.error(err);
      }
    });
  }

  resetSelection(): void {
    this.selectedCountry = null;
    this.correctChoice = null;
    this.showPopulation = false;
    this.isBlocked = false;
    this.choiceMade = false;
    this.errorMessage = '';
  }

  selectCountry(selectedCountry: CountryPopulation): void {
    if (this.isBlocked) {
      return;
    }

    this.selectedCountry = selectedCountry;
    this.showPopulation = true;
    this.isBlocked = true;
    this.choiceMade = true;

    this.correctChoice = selectedCountry.population >= Math.max(this.country1.population, this.country2.population);

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
        gameType: 'Country-Population',
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
      this.loadNewCountries();
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
