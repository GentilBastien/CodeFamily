import WebSocket from 'ws';
import { Observable } from 'rxjs';
import { GameDTO } from './GameDTO';

export interface ComModel {
  webSocket: WebSocket;
  com$: Observable<GameDTO>;
}
