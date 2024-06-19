import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GameScore } from '../models/game-score.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  private apiUrl = 'https://localhost:7258/api/game-score';

  constructor(private http: HttpClient) { }

  saveGameResult(gameScore: GameScore): Observable<GameScore> {
    return this.http.post<GameScore>(`${this.apiUrl}/add`, gameScore);
  }

}
