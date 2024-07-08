import { Component } from '@angular/core';
import { CityDetails } from 'src/app/models/city-details.model';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-city',
  templateUrl: './city-details.component.html',
  styleUrls: ['./city-details.component.css']
})
export class CityComponent {
  cityName: string = '';
  cityDetails?: CityDetails;
  errorMessage: string = '';
  showSearchForm: boolean = true;

  constructor(private cityService: CityService) { }

  ngInit() { }

  onSubmit(): void {
    if (this.cityName) {
      this.cityService.getCityDetails(this.cityName).subscribe({
        next: (data) => {
          this.cityDetails = data;
          this.errorMessage = '';
          this.showSearchForm = false;
        },
        error: (err) => {
          this.errorMessage = 'Błąd podczas ładowania danych. Spróbuj ponownie.';
          console.error(err);
        }
      });
    } else {
      this.errorMessage = 'Nazwa miasta nie może być pusta.';
    }
  }

  toggleSearchForm() {
    this.showSearchForm = !this.showSearchForm;
  }

}
