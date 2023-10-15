import { GameBase } from './GameBase';
import { Player } from './types/Player';

export class Game extends GameBase {
  constructor() {
    super();
  }

  public update(): void {
    /* Retire le premier élément, et l'ajoute ensuite à la fin. Methode pour faire tour suivant. */
    const playerTurn: Player = this._players.shift()!;
    // this._players contains only other players now
    this._players.push(playerTurn);
  }
}
