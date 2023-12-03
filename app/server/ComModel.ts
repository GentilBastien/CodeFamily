import WebSocket from 'ws';
import { Observable } from 'rxjs';
import { ServerDto } from './dtos/ServerDto';

export interface ComModel {
  webSocket: WebSocket;
  com$: Observable<ServerDto>;
}
