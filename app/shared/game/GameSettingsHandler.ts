import { buildPlayer, Player } from '../types/Player';
import { ComModel } from '../../server/ComModel';

const playerWithNoComModel = (player: Player): boolean => player.comModel === undefined;

export abstract class GameSettingsHandler {
  public players: Player[];
  protected nbPlayers: number;
  protected requestedNbPlayers: number;

  protected constructor() {
    this.players = [];
    this.nbPlayers = 0;
    this.requestedNbPlayers = 4;
  }

  public playerConnected(name: string, comModel: ComModel): void {
    const needReplace: boolean = this.players.some(playerWithNoComModel);
    if (needReplace) {
      const emptyPlayer: Player = this.players.find(playerWithNoComModel)!;
      emptyPlayer.name = name;
      emptyPlayer.comModel = comModel;
      console.log(emptyPlayer.name + " s'est connecté pour replace !");
    } else {
      const player: Player = buildPlayer(name, comModel);
      this.players.push(player);
      console.log(player.name + " s'est connecté !");
    }
    this.nbPlayers++;
  }

  public playerDisconnected(comModel: ComModel): void {
    const player: Player | undefined = this.players.find(
      (player: Player): boolean => player.comModel?.webSocket === comModel.webSocket
    );
    if (player) {
      console.log(player.name + " s'est déconnecté !");
      player.comModel = undefined;
      this.nbPlayers--;
    } else {
      throw Error('Could not find player with websocket ' + comModel.webSocket);
    }
  }
}
