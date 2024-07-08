import { Component } from '@angular/core';
import { ScoreService } from 'src/app/services/score.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private scoreService: ScoreService) { }

  deleteAllScores(): void {
    this.scoreService.deleteAllScores().subscribe({
      next: () => {
        this.successMessage = 'Wszystkie wyniki zostały usunięte.';
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = 'Błąd podczas usuwania wyników. Spróbuj ponownie.';
        this.successMessage = '';
        console.error(err);
      }
    });
  }
}
