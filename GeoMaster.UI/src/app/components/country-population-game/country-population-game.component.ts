import { Component, OnInit } from '@angular/core';
import { CountryPopulation } from 'src/app/models/country-population.model';
import { CountryService } from 'src/app/services/country.service';

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

  constructor(private countryService: CountryService) { }

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
}
