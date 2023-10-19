import { buildPlayer, Player } from './types/Player';
import { GameState } from './types/GameState';

export abstract class GameBase {
  protected players: Player[];
  protected nbPlayers: number;
  protected requestedNbPlayers: number;
  protected gameState: GameState;
  protected constructor() {
    this.players = [];
    this.nbPlayers = 0;
    this.requestedNbPlayers = 4;
    this.gameState = GameState.WAITING;
  }

  public get getGameState(): GameState {
    return this.gameState;
  }

  public playerConnected(name: string, ws: WebSocket): void {
    const player: Player = buildPlayer(name, ws);
    console.log(player.name + " s'est connecté !");
    this.players.push(player);
    this.nbPlayers++;
    this._updateGameState();
  }

  public playerDisconnected(ws: WebSocket): void {
    const player: Player | undefined = this.players.find(player => player.websocket === ws);
    if (player) {
      this.players.splice(this.players.indexOf(player), 1);
      this.nbPlayers--;
      this._updateGameState();
    } else {
      throw Error('Could not find player with websocket ' + ws);
    }
  }

  private _updateGameState(): void {
    if (this.nbPlayers == this.requestedNbPlayers) {
      this.gameState = GameState.STARTED;
      console.log('la partie commence !');
    }
  }
}
