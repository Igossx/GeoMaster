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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GameScoresComponent } from './components/game-scores/game-scores.component';
import { MatPaginatedTabHeader, MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { MatSortModule } from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CountrySurfaceGameComponent } from './components/country-surface-game/country-surface-game.component';
import { CityPopulationGameComponent } from './components/city-population-game/city-population-game.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CountryComponent,
    CityComponent,
    CountryPopulationGameComponent,
    GameScoresComponent,
    AboutUsComponent,
    CountrySurfaceGameComponent,
    CityPopulationGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
