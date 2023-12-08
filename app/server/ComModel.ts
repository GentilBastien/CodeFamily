import WebSocket from 'ws';
import { Observable } from 'rxjs';
import { ClientDto } from './dtos/ClientDto';

export interface ComModel {
  webSocket: WebSocket;
  com$: Observable<ClientDto>;
}
