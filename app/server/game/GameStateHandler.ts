import { GameState } from '../types/GameState';
import { GameSettingsHandler } from './GameSettingsHandler';
import { ComModel } from '../ComModel';

export abstract class GameStateHandler extends GameSettingsHandler {
  public gameState: GameState;

  protected constructor() {
    super();
    this.gameState = GameState.WAITING;
  }

  public override playerConnected(name: string, comModel: ComModel): void {
    super.playerConnected(name, comModel);
    if (this.nbPlayers === this.requestedNbPlayers) {
      if (this.gameState === GameState.WAITING) {
        this.gameState = GameState.STARTED;
        console.log('la partie commence avec :');
        console.log(this.players.map(p => p.name));
      }
      if (this.gameState === GameState.PAUSED) {
        this.gameState = GameState.STARTED;
        console.log('la partie reprend avec :');
        console.log(this.players.map(p => p.name));
      }
    }
  }

  public override playerDisconnected(comModel: ComModel): void {
    super.playerDisconnected(comModel);
    if (this.gameState === GameState.STARTED) {
      console.log('la partie est en pause...');
      this.gameState = GameState.PAUSED;
    }
    if (this.gameState !== GameState.WAITING && this.nbPlayers === 0) {
      console.log('la partie est prete à etre retirée');
      this.gameState = GameState.TO_REMOVE;
    }
  }

  public abstract updateWaitingGame(): void;
  public abstract updateStartedGame(): void;
  public abstract updatePausedGame(): void;
  public abstract updateFinishedGame(): void;
}
