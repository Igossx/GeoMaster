import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CityDetails } from '../models/city-details.model';
import { CityPopulation } from '../models/city-population.model';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private apiUrl: string = environment.apiBaseUrl + '/city';

  constructor(private http: HttpClient) { }

  getCityDetails(cityName: string): Observable<CityDetails> {
    const url = `${this.apiUrl}/${cityName}`;
    return this.http.get<CityDetails>(url);
  }

  getTwoRandomCitiesWithPopulation(): Observable<{ city1: CityPopulation, city2: CityPopulation }> {
    const url = `${this.apiUrl}/two-random-population`;
    return this.http.get<{ city1: CityPopulation, city2: CityPopulation }>(url);
  }
}
