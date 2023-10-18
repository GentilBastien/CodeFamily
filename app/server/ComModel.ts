import WebSocket from 'ws';
import { Observable } from 'rxjs';

export interface ComModel {
  webSocket: WebSocket;
  com$: Observable<object>;
}
