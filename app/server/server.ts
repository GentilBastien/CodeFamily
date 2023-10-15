import WebSocket, { WebSocketServer } from 'ws';
import { Observable, Subscriber, Subscription } from 'rxjs';

const webSocketServer: WebSocketServer = new WebSocketServer({ port: 8080 });

webSocketServer.on('connection', (webSocket: WebSocket): void => {
  console.log('Client connected');

  const webSocketObservable: Observable<string> = new Observable<string>((observer: Subscriber<string>): void => {
    webSocket.on('message', (data: string): void => {
      observer.next(data);
    });

    webSocket.on('close', (): void => {
      observer.complete();
    });

    webSocket.on('error', (error: Error): void => {
      observer.error(error);
    });
  });

  const subscription: Subscription = webSocketObservable.subscribe((message: string): void => {
    console.log('Received message:', message);
    webSocket.send(`Received: ${message}`);
  });

  webSocket.on('close', (): void => {
    console.log('Client disconnected');
    subscription.unsubscribe();
  });
});
