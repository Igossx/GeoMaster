import { Component } from '@angular/core';
import { CountrySurfaceArea } from 'src/app/models/country-surface-area.model';
import { GameScore } from 'src/app/models/game-score.model';
import { CountryService } from 'src/app/services/country.service';
import { ScoreService } from 'src/app/services/score.service';

@Component({
  selector: 'app-country-surface-game',
  templateUrl: './country-surface-game.component.html',
  styleUrls: ['./country-surface-game.component.css']
})
export class CountrySurfaceGameComponent {
  country1!: CountrySurfaceArea;
  country2!: CountrySurfaceArea;
  score: number = 0;
  errorMessage: string = '';
  successMessage: string = '';
  gameStarted: boolean = false;
  gameOver: boolean = false;
  showSurfaceArea: boolean = false;
  isBlocked: boolean = false;
  correctChoice: boolean | null = null;
  selectedCountry: CountrySurfaceArea | null = null;
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
    this.countryService.getTwoRandomCountriesWithSurfaceArea().subscribe({
      next: (data) => {
        this.country1 = data.country1;
        this.country2 = data.country2;
        this.resetSelection();
      },
      error: (err) => {
        this.errorMessage = 'Błąd podczas ładowania danych. Spróbuj ponownie.';
        console.error(err);
      }
    });
  }

  resetSelection(): void {
    this.selectedCountry = null;
    this.correctChoice = null;
    this.showSurfaceArea = false;
    this.isBlocked = false;
    this.choiceMade = false;
    this.errorMessage = '';
  }

  selectCountry(selectedCountry: CountrySurfaceArea): void {
    if (this.isBlocked) {
      return;
    }

    this.selectedCountry = selectedCountry;
    this.showSurfaceArea = true;
    this.isBlocked = true;
    this.choiceMade = true;

    this.correctChoice = selectedCountry.surfaceArea >= Math.max(this.country1.surfaceArea, this.country2.surfaceArea);

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
        gameType: 'Country-Surface-Area',
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
