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
  showSearchForm: boolean = true;

  constructor(private countryService: CountryService) { }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.countryName) {
      this.countryService.getCountryDetails(this.countryName).subscribe({
        next: (data) => {
          this.countryDetails = data;
          this.errorMessage = '';
          this.showSearchForm = false;
        },
        error: (err) => {
          this.errorMessage = 'Błąd podczas ładowania danych. Spróbuj ponownie.';
          console.error(err);
        }
      });
    } else {
      this.errorMessage = 'Nazwa kraju nie może być pusta.';
    }
  }

  toggleSearchForm() {
    this.showSearchForm = !this.showSearchForm;
  }

}
