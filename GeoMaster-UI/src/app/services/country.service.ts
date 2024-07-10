import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CountryDetails } from '../models/country-details.model';
import { CountryPopulation } from '../models/country-population.model';
import { environment } from 'src/environments/environment';
import { CountrySurfaceArea } from '../models/country-surface-area.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private apiUrl: string = environment.apiBaseUrl + '/country';

  constructor(private http: HttpClient) { }

  getCountryDetails(countryName: string): Observable<CountryDetails> {
    const url = `${this.apiUrl}/${countryName}`;
    return this.http.get<CountryDetails>(url);
  }

  getTwoRandomCountriesWithPopulation(): Observable<{ country1: CountryPopulation, country2: CountryPopulation }> {
    const url = `${this.apiUrl}/two-random-population`;
    return this.http.get<{ country1: CountryPopulation, country2: CountryPopulation }>(url);
  }

  getTwoRandomCountriesWithSurfaceArea(): Observable<{ country1: CountrySurfaceArea, country2: CountrySurfaceArea }> {
    const url = `${this.apiUrl}/two-random-surface-area`;
    return this.http.get<{ country1: CountrySurfaceArea, country2: CountrySurfaceArea }>(url);
  }

}
