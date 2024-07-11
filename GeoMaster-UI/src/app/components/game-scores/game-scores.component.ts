import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GameScore } from 'src/app/models/game-score.model';
import { ScoreService } from 'src/app/services/score.service';

@Component({
  selector: 'app-game-scores',
  templateUrl: './game-scores.component.html',
  styleUrls: ['./game-scores.component.css']
})
export class GameScoresComponent {

  displayedColumns: string[] = ['position', 'username', 'score', 'gameTime', 'date'];
  countryPopulationDataSource = new MatTableDataSource<GameScore>();
  countrySurfaceAreaDataSource = new MatTableDataSource<GameScore>();
  cityPopulationDataSource = new MatTableDataSource<GameScore>();

  countryPopulationNoDataMessage: string = '';
  countrySurfaceAreaNoDataMessage: string = '';
  cityPopulationNoDataMessage: string = '';

  errorMessage: string = '';
  noDataMessage: string = '';

  @ViewChild('countryPopulationPaginator') countryPopulationPaginator!: MatPaginator;
  @ViewChild('countrySurfaceAreaPaginator') countrySurfaceAreaPaginator!: MatPaginator;
  @ViewChild('cityPopulationPaginator') cityPopulationPaginator!: MatPaginator;

  constructor(private scoreService: ScoreService) { }

  ngOnInit(): void {
    this.loadScores('Country-Population');
  }

  ngAfterViewInit() {
    this.countryPopulationDataSource.paginator = this.countryPopulationPaginator;
    this.countrySurfaceAreaDataSource.paginator = this.countrySurfaceAreaPaginator;
    this.cityPopulationDataSource.paginator = this.cityPopulationPaginator;
  }

  loadScores(gameType: string): void {
    this.errorMessage = '';
    this.scoreService.getScoresByGameType(gameType).subscribe({
      next: (data) => {
        if (data.length === 0) {
          this.setNoDataMessage(gameType, `Brak wyników dla ${gameType}`);
        } else {
          this.clearNoDataMessage(gameType);
        }

        this.setScores(gameType, data);
      },
      error: (err) => {
        this.errorMessage = 'Błąd podczas ładowania wyników. Spróbuj ponownie.';
        console.error(err);
      }
    });
  }

  setNoDataMessage(gameType: string, message: string): void {
    switch (gameType) {
      case 'Country-Population':
        this.countryPopulationNoDataMessage = message;
        break;
      case 'Country-Surface-Area':
        this.countrySurfaceAreaNoDataMessage = message;
        break;
      case 'City-Population':
        this.cityPopulationNoDataMessage = message;
        break;
    }
  }

  clearNoDataMessage(gameType: string): void {
    switch (gameType) {
      case 'Country-Population':
        this.countryPopulationNoDataMessage = '';
        break;
      case 'Country-Surface-Area':
        this.countrySurfaceAreaNoDataMessage = '';
        break;
      case 'City-Population':
        this.cityPopulationNoDataMessage = '';
        break;
    }
  }

  setScores(gameType: string, scores: GameScore[]): void {
    switch (gameType) {
      case 'Country-Population':
        this.countryPopulationDataSource.data = scores;
        break;
      case 'Country-Surface-Area':
        this.countrySurfaceAreaDataSource.data = scores;
        break;
      case 'City-Population':
        this.cityPopulationDataSource.data = scores;
        break;
    }
  }

  onTabChange(event: any): void {
    let selectedGameType = '';
    switch (event.tab.textLabel) {
      case 'Country Population':
        selectedGameType = 'Country-Population';
        break;
      case 'Country Surface Area':
        selectedGameType = 'Country-Surface-Area';
        break;
      case 'City Population':
        selectedGameType = 'City-Population';
        break;
      default:
        selectedGameType = 'Country-Population';
    }
    this.loadScores(selectedGameType);
  }

}
