import { GameStateHandler } from './GameStateHandler';
import { ComModel } from '../ComModel';

export abstract class GameTurnHandler extends GameStateHandler {
  protected playersComModels: ComModel[];
  protected constructor() {
    super();
    this.playersComModels = [];
  }

  public override playerConnected(name: string, comModel: ComModel): void {
    super.playerConnected(name, comModel);
    this.playersComModels.push(comModel);
    this.playersComModels.forEach(a => a.webSocket.send('caca'));
  }

  public override playerDisconnected(comModel: ComModel): void {
    super.playerDisconnected(comModel);
    const index: number = this.playersComModels.indexOf(comModel);
    if (index) {
      this.playersComModels.splice(index, 1);
    } else {
      throw Error('No com model found');
    }
  }

  protected gameStart(): void {
    // merge(...playersMessages)
    //   .pipe(tap(a => console.log(a.msg, a.num)))
    //   .subscribe();
  }
}
