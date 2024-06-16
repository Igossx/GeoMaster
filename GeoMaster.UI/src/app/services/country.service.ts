import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CountryDetails } from '../models/country-details.model';
import { CountryPopulation } from '../models/country-population.model';
import { GameScore } from '../models/game-score.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private apiUrl = 'https://localhost:7258/api/country';

  constructor(private http: HttpClient) { }

  getCountryDetails(countryName: string): Observable<CountryDetails> {
    return this.http.get<CountryDetails>(`${this.apiUrl}/${countryName}`);
  }

  getTwoRandomCountriesWithPopulation(): Observable<{ country1: CountryPopulation, country2: CountryPopulation }> {
    return this.http.get<{ country1: CountryPopulation, country2: CountryPopulation }>(`${this.apiUrl}/two-random-population`);
  }

  saveGameResult(gameScore: GameScore): Observable<GameScore> {
    return this.http.post<GameScore>(`${this.apiUrl}/add-game-score`, gameScore);
  }

}
