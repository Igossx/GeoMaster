import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CountryComponent } from './components/country-details/country-details.component';
import { CityComponent } from './components/city-details/city-details.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CountryPopulationGameComponent } from './components/country-population-game/country-population-game.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CountryComponent,
    CityComponent,
    CountryPopulationGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
