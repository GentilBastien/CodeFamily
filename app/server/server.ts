import WebSocket, { RawData, WebSocketServer } from 'ws';
import { Observable, Subscriber } from 'rxjs';
import { ComModel } from './ComModel';
import { GameDTO } from './GameDTO';
import { Hub } from '../shared/Hub';

const webSocketServer: WebSocketServer = new WebSocketServer({ port: 8080 });
const connections: ComModel[] = [];
const hub: Hub = new Hub();

webSocketServer.on('connection', (webSocket: WebSocket): void => {
  const subscriber = (observer: Subscriber<GameDTO>): void => {
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
      console.log('code', code, 'buffer', buffer);
      hub.playerLeftGame(comModel);
      observer.complete();
    });

    webSocket.on('error', (error: Error): void => {
      observer.error(error);
    });
  };

  const webSocketObservable$: Observable<GameDTO> = new Observable<GameDTO>(subscriber);
  const comModel: ComModel = {
    webSocket: webSocket,
    com$: webSocketObservable$,
  };
  webSocketObservable$.subscribe(a => console.log(a.msg, a.num));
  connections.push(comModel);
  hub.playerEntersGame('pablito' + Math.floor(Math.random() * 1000), comModel);
});
