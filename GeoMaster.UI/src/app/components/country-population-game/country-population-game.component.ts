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
    this.timerInterval = setInterval(() => {
      this.timeElapsed++;
    }, 1000);
    this.loadNewCountries();
  }

  loadNewCountries(): void {
    this.countryService.getTwoRandomCountriesWithPopulation().subscribe({
      next: data => {
        this.country1 = data.country1;
        this.country2 = data.country2;
        this.errorMessage = '';
        this.selectedCountry = null;
        this.correctChoice = null;
        this.showPopulation = false;
        this.isBlocked = false;
        this.choiceMade = false;
      },
      error: err => {
        this.errorMessage = 'Błąd podczas ładowania danych. Spróbuj ponownie.';
        console.error(err);
      }
    });
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
      if (this.correctChoice) {
        this.score++;
        this.loadNewCountries();
      } else {
        clearInterval(this.timerInterval);
        this.gameOver = true;
        this.gameStarted = false;
      }
    }, 3500);
  }

  submitScore(): void {
    if (this.username) {
      const gameScore: GameScore = {
        id: null,
        score: this.score,
        gameTime: this.timeElapsed,
        username: this.username,
        gameType: 'Country-Population',
        date: null
      };

      this.scoreService.saveGameResult(gameScore).subscribe({
        next: response => {
          console.log('Wynik zapisany:', response);
        },
        error: err => {
          this.errorMessage = 'Błąd podczas zapisu danych. Spróbuj ponownie.';
          console.error(err);
        }
      });
    } else {
      this.errorMessage = 'Nazwa użytkownika nie może być pusta.';
    }
  }

  toggleSaveForm() {
    this.showSaveResultForm = !this.showSaveResultForm;
  }
}
