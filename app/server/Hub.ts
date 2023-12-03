import { Game } from './game/Game';
import { GameState } from './types/GameState';
import { Player } from './types/Player';
import { ComModel } from './ComModel';

const gamePaused = (game: Game): boolean => game.gameState === GameState.PAUSED;
const gameWaiting = (game: Game): boolean => game.gameState === GameState.WAITING;

export class Hub {
  private games: Game[] = [];

  public playerEntersGame(name: string, comModel: ComModel): void {
    // Find a game that is paused
    let gameToJoin: Game | undefined = this.games.find(gamePaused);

    // If no paused game, find a waiting game
    if (!gameToJoin) {
      gameToJoin = this.games.find(gameWaiting);
    }

    // If no waiting game, create a new game
    if (!gameToJoin) {
      gameToJoin = new Game();
      this.games.push(gameToJoin);
    }
    gameToJoin.playerConnected(name, comModel);
  }

  public playerLeftGame(comModel: ComModel): void {
    const game: Game | undefined = this.games.find(
      (game: Game): boolean =>
        !!game.players.find((player: Player): boolean => player.comModel?.webSocket === comModel.webSocket)
    );
    if (game) {
      game.playerDisconnected(comModel);
    } else {
      throw Error('no game found where this player was');
    }
  }

  // public updateGames(): void {
  //   this.games.forEach((game: Game): void => {
  //     game.update();
  //     this.checkToDestroyGame(game);
  //   });
  // }

  // private checkToDestroyGame(game: Game): void {
  //   if (game.gameState === GameState.TO_REMOVE) {
  //     this.games.splice(this.games.indexOf(game), 1);
  //   }
  // }
}
