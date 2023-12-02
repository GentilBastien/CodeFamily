import { GameStateHandler } from './GameStateHandler';

export abstract class GameTurnHandler extends GameStateHandler {
  protected constructor() {
    super();
    // const a = this.players.map((player: Player) => player.comModel).map((comModel: ComModel) => comModel.com$);
    // a[0].pipe(tap(a => console.log('joueur1 a parlé : ', a.msg, a.num))).subscribe();
    // a[1].pipe(tap(a => console.log('joueur2 a parlé : ', a.msg, a.num))).subscribe();
    // a[2].pipe(tap(a => console.log('joueur3 a parlé : ', a.msg, a.num))).subscribe();
    // a[3].pipe(tap(a => console.log('joueur4 a parlé : ', a.msg, a.num))).subscribe();
  }
}
