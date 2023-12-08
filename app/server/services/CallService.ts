import { RawData, WebSocket } from 'ws';
import { ComModel } from '../ComModel';
import { Observable, Subscriber } from 'rxjs';
import { ClientDto } from '../dtos/ClientDto';
import { ServerDto } from '../dtos/ServerDto';
import { Hub } from '../Hub';

export class CallService {
  private static instance: CallService | null = null;
  private constructor() {}
  public static getInstance(): CallService {
    if (!CallService.instance) {
      CallService.instance = new CallService();
    }
    return CallService.instance;
  }

  private readonly hub: Hub = new Hub();
  private readonly comModels: ComModel[] = [];

  addNewClient(webSocket: WebSocket): void {
    const subscriber = (observer: Subscriber<ClientDto>): void => {
      webSocket.on('message', (data: RawData): void => {
        const clientDto: ClientDto = this.convertRawData(data);
        //TODO switch code
        this.handleData(comModel, webSocket, clientDto);
      });

      webSocket.on('close', (code: number): void => {
        this.clientClosedConnection(code, webSocket);
        this.hub.playerLeftGame(comModel);
        observer.complete();
      });

      webSocket.on('error', (error: Error): void => {
        observer.error(error);
      });
    };
    const webSocketObservable$: Observable<ClientDto> = new Observable<ClientDto>(subscriber);
    const comModel: ComModel = {
      webSocket: webSocket,
      com$: webSocketObservable$,
    };
    this.comModels.push(comModel);
    webSocketObservable$.subscribe();
  }

  sendToClient(webSocket: WebSocket, message: ServerDto): void {
    const stringifyObject: string = JSON.stringify(message);
    webSocket.send(stringifyObject);
  }

  private clientClosedConnection(code: number, webSocket: WebSocket): void {
    const index: number = this.comModels.findIndex(a => a.webSocket === webSocket);
    this.comModels.splice(index, 1);
    console.log('client closed connection with code ' + code);
  }

  private convertRawData(data: RawData): ClientDto {
    const buffer: Buffer | ArrayBuffer | Buffer[] = data;
    if (Buffer.isBuffer(buffer)) {
      const jsonString: string = buffer.toString('utf-8');
      return JSON.parse(jsonString);
    } else {
      throw Error('Not a buffer.');
    }
  }

  private handleData(comModel: ComModel, webSocket: WebSocket, clientDto: ClientDto): void {
    switch (clientDto.code) {
      case 1000:
        this.sendToClient(webSocket, {
          code: 1000,
          field01: 'vous vous êtes bien connecté, ' + clientDto.field01,
        });
        this.hub.playerEntersGame(clientDto.field01!, comModel);
        break;
    }
  }
}
