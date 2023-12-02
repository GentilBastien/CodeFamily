import { Card } from './Card';
import { ComModel } from '../../server/ComModel';

export interface Player {
  name: string;
  comModel: ComModel | undefined;
  cardsPlayed: Card[];
  cardsHand: Card[];
  hisTurn: boolean;
  hasPlayed: boolean;
}

export function buildPlayer(name: string, comModel: ComModel): Player {
  return {
    name,
    comModel,
    cardsPlayed: [],
    cardsHand: [],
    hisTurn: false,
    hasPlayed: false,
  };
}
