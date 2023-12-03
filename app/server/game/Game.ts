import { Player } from '../types/Player';
import { GameState } from '../types/GameState';
import { GameTurnHandler } from './GameTurnHandler';

export class Game extends GameTurnHandler {
  constructor() {
    super();
  }

  public update(): void {
    switch (this.gameState) {
      case GameState.WAITING:
        this.updateWaitingGame();
        break;
      case GameState.STARTED:
        this.updateStartedGame();
        break;
      case GameState.PAUSED:
        this.updatePausedGame();
        break;
      case GameState.FINISHED:
        this.updateFinishedGame();
        break;
      case GameState.TO_REMOVE:
        break;
    }
  }

  public override updateFinishedGame(): void {}

  public override updatePausedGame(): void {}

  public override updateStartedGame(): void {
    const playerTurn: Player = this.players.shift()!;
    // this._players contains only other players now
    console.log('au tour de ' + playerTurn.name + ' de jouer !');
    this.players.push(playerTurn);
  }

  public override updateWaitingGame(): void {}
}
