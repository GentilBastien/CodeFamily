import WebSocket, { RawData, WebSocketServer } from 'ws';
import { Observable, Subscriber } from 'rxjs';
import { ComModel } from './ComModel';
import { GameDTO } from './GameDTO';

const webSocketServer: WebSocketServer = new WebSocketServer({ port: 8080 });
const connections: ComModel[] = [];

const webSocketObservable$: Observable<GameDTO> = new Observable<GameDTO>((observer: Subscriber<GameDTO>): void => {
  webSocketServer.on('connection', (webSocket: WebSocket): void => {
    connections.push({
      webSocket: webSocket,
      com$: webSocketObservable$,
    });

    webSocket.on('message', (data: RawData): void => {
      const buffer: Buffer | ArrayBuffer | Buffer[] = data;
      if (Buffer.isBuffer(buffer)) {
        const jsonString: string = buffer.toString('utf8');
        const gameDTO: GameDTO = JSON.parse(jsonString);
        observer.next(gameDTO);
      } else {
        throw Error('Not a buffer.');
      }
    });

    webSocket.on('close', (code: number, buffer: Buffer): void => {
      console.log(code, buffer);
      observer.complete();
    });

    webSocket.on('error', (error: Error): void => {
      observer.error(error);
    });
  });
});

webSocketObservable$.subscribe(a => console.log(a.msg, a.num));
