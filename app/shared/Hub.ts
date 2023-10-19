import { Game } from './Game';
import { GameState } from './types/GameState';

const games: Game[] = [];

function playerSelectsGame(name: string, ws: WebSocket): void {
  const gameWaiting: Game = games.find((game: Game): boolean => game.getGameState === GameState.WAITING) ?? new Game();
  gameWaiting.playerConnected(name, ws);
  checkToStartGame(gameWaiting);
}

function checkToStartGame(game: Game): void {
  if (game.getGameState === GameState.STARTED) {
    games.push(game);
  }
}

function checkToDestroyGame(game: Game): void {
  if (game.getGameState === GameState.TO_REMOVE) {
    games.splice(games.indexOf(game), 1);
  }
}

function updateGames() {
  games.forEach((game: Game): void => {
    game.update();
    checkToDestroyGame(game);
  });
}
