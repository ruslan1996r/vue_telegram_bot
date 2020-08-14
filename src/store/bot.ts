import { Getters, Mutations, Actions, Module, createMapper } from 'vuex-smart-module';
import { IBot } from '../types/index';

class BotState {
  public dialog: boolean = false;
  public bot: IBot | null = null; // ПЕРЕДАВАТЬ БОТА ПРИ ОТКРЫТИИ ДИАЛОГА
  public bots: IBot[] = [{
    id: Math.random(),
    name: 'Bot_1',
    image: null,
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. ',
    date: new Date().toISOString().substr(0, 10),
  },
  {
    id: Math.random(),
    name: 'Bot_2',
    image: null,
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. ',
    date: new Date().toISOString().substr(0, 10),
  }];
}

class BotGetters extends Getters<BotState> {
  get allBots(): IBot[] {
    return this.state.bots;
  }
  get dialog(): boolean {
    return this.state.dialog;
  }
  get currentBot(): IBot | null {
    return this.state.bot;
  }
}

class BotMutations extends Mutations<BotState> {
  public addBot(bot: IBot): IBot[] {
    return this.state.bots = [...this.state.bots, bot];
  }
  public updateBot(bot: IBot): IBot[] {
    const botIndex = this.state.bots.findIndex((b: IBot) => b.id === bot.id);
    return this.state.bots.splice(botIndex, 1, bot);
  }
  public deleteBot(botId: number): IBot[] {
    const filtredBots = this.state.bots.filter((bot: IBot) => bot.id !== botId);
    return this.state.bots = filtredBots;
  }
  public changeDialogShow(show: boolean): boolean {
    return this.state.dialog = show;
  }
  public setCurrentBot(botId: number): any {
    const bot: IBot | any = this.state.bots.find((b: IBot) => b.id === botId);
    if (!bot) {
      return this.state.bot = null;
    }
    return this.state.bot = bot;
  }
}

class BotActions extends Actions<
  BotState,
  BotGetters,
  BotMutations,
  BotActions
  > {
  public addNewBot(bot: IBot): void {
    this.commit('changeDialogShow', false);
    this.commit('addBot', bot);
  }
  public deleteBotById(botId: number): void {
    this.commit('changeDialogShow', false);
    this.commit('deleteBot', botId);
  }
  public updateBot(bot: IBot): void {
    this.commit('updateBot', bot);
  }
  public changeDialogShow(params: { show: boolean, botId: number }): void {
    const { show, botId } = params;

    this.commit('setCurrentBot', botId);
    this.commit('changeDialogShow', show);
  }
}

const botStore = new Module({
  state: BotState,
  getters: BotGetters,
  mutations: BotMutations,
  actions: BotActions,
});

export const botMapper = createMapper(botStore);

export default botStore;
