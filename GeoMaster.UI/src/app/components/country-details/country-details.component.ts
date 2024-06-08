import { Component, OnInit } from '@angular/core';
import { CountryDetails } from 'src/app/models/country-details.model';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-country',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css']
})
export class CountryComponent implements OnInit {

  countryName: string = '';
  countryDetails?: CountryDetails;
  errorMessage: string = '';

  constructor(private countryService: CountryService) { }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.countryName) {
      this.countryService.getCountryDetails(this.countryName).subscribe(
        (data: CountryDetails) => {
          this.countryDetails = data;
          this.errorMessage = '';
        },
        (error) => {
          this.errorMessage = 'Błąd podczas ładowania danych. Spróbuj ponownie.';
          console.error(error);
        }
      );
    } else {
      this.errorMessage = 'Nazwa kraju nie może być pusta.';
    }
  }
}
