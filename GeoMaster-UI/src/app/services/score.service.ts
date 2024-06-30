import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GameScore } from '../models/game-score.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  private apiUrl: string = environment.apiBaseUrl + '/game-score';

  constructor(private http: HttpClient) { }

  saveGameResult(gameScore: GameScore): Observable<GameScore> {
    const url = `${this.apiUrl}/add`;
    return this.http.post<GameScore>(url, gameScore);
  }

  getScoresByGameType(gameType: string): Observable<GameScore[]> {
    const url = `${this.apiUrl}/get/${gameType}`;
    return this.http.get<GameScore[]>(url);
  }

  deleteAllScores(): Observable<void> {
    const url = `${this.apiUrl}/delete-all`;
    return this.http.delete<void>(url);
  }

}
