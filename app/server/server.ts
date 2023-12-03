import WebSocket, { RawData, WebSocketServer } from 'ws';
import { Observable, Subscriber } from 'rxjs';
import { ComModel } from './ComModel';
import { Hub } from './Hub';
import { ServerDto } from './dtos/ServerDto';

const webSocketServer: WebSocketServer = new WebSocketServer({ port: 8080 });
const connections: ComModel[] = [];
const hub: Hub = new Hub();

webSocketServer.on('connection', (webSocket: WebSocket): void => {
  const subscriber = (observer: Subscriber<ServerDto>): void => {
    webSocket.on('message', (data: RawData): void => {
      const buffer: Buffer | ArrayBuffer | Buffer[] = data;
      if (Buffer.isBuffer(buffer)) {
        const jsonString: string = buffer.toString('utf-8');
        const gameDTO: ServerDto = JSON.parse(jsonString);
        console.log(gameDTO);
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

  const webSocketObservable$: Observable<ServerDto> = new Observable<ServerDto>(subscriber);
  const comModel: ComModel = {
    webSocket: webSocket,
    com$: webSocketObservable$,
  };
  connections.push(comModel);
  // hub.playerEntersGame('pablito' + Math.floor(Math.random() * 9999), comModel);
});
