import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CountryComponent } from './components/country-details/country-details.component';
import { CityComponent } from './components/city-details/city-details.component';
import { CountryPopulationGameComponent } from './components/country-population-game/country-population-game.component';
import { GameScoresComponent } from './components/game-scores/game-scores.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { CountrySurfaceGameComponent } from './components/country-surface-game/country-surface-game.component';
import { CityPopulationGameComponent } from './components/city-population-game/city-population-game.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'country',
    component: CountryComponent
  },
  {
    path: 'city',
    component: CityComponent
  },
  {
    path: 'country-population-game',
    component: CountryPopulationGameComponent
  },
  {
    path: 'country-surface-game',
    component: CountrySurfaceGameComponent
  },
  {
    path: 'city-population-game',
    component: CityPopulationGameComponent
  },
  {
    path: 'game-scores',
    component: GameScoresComponent
  },
  {
    path: 'about-us',
    component: AboutUsComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
