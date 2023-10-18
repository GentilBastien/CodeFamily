import { buildPlayer, Player } from './types/Player';
import { GameState } from './types/GameState';

export abstract class GameBase {
  protected _players: Player[];
  protected _nbPlayers: number;
  protected _requestedNbPlayers: number;
  protected _gameState: GameState;
  protected constructor() {
    this._players = [];
    this._nbPlayers = 0;
    this._requestedNbPlayers = 4;
    this._gameState = GameState.WAITING;
  }

  public get gameState(): GameState {
    return this._gameState;
  }

  public playerConnected(name: string, ws: WebSocket): void {
    const player: Player = buildPlayer(name, ws);
    console.log(player.name + " s'est connecté !");
    this._players.push(player);
    this._nbPlayers++;
    this._updateGameState();
  }

  public playerDisconnected(ws: WebSocket): void {
    const player: Player | undefined = this._players.find(player => player.websocket === ws);
    if (player) {
      this._players.splice(this._players.indexOf(player), 1);
      this._nbPlayers--;
      this._updateGameState();
    } else {
      throw Error('Could not find player with websocket ' + ws);
    }
  }

  private _updateGameState(): void {
    if (this._nbPlayers == this._requestedNbPlayers) {
      this._gameState = GameState.STARTED;
      console.log('la partie commence !');
    }
  }
}
