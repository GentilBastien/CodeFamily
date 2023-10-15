import { Card } from './Card';

export interface Player {
  name: string;
  websocket: WebSocket;
  cardsPlayed: Card[];
  cardsHand: Card[];
}

export function buildPlayer(name: string, websocket: WebSocket): Player {
  return {
    name,
    websocket,
    cardsPlayed: [],
    cardsHand: [],
  };
}
