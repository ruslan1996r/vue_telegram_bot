import { Getters, Mutations, Actions, Module, createMapper } from 'vuex-smart-module';

class BotState {
  public test: string = 'test_string';
}

class BotGetters extends Getters<BotState> {
  get test(): string {
    return this.state.test;
  }
}

class BotMutations extends Mutations<BotState> {
  public mutateTest(test: string): string {
    return this.state.test = test;
  }
}

class BotActions extends Actions<
  BotState,
  BotGetters,
  BotMutations,
  BotActions
  > {
  public testAction(test: string): void {
    this.commit('mutateTest', test);
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
