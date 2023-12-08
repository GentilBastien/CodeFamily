import WebSocket, { WebSocketServer } from 'ws';
import { CallService } from './services/CallService';

const webSocketServer: WebSocketServer = new WebSocketServer({ port: 8080 });
const callService: CallService = CallService.getInstance();

webSocketServer.on('connection', (webSocket: WebSocket): void => {
  callService.addNewClient(webSocket);
});
