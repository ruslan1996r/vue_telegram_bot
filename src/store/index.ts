import Vue from 'vue';
import * as Vuex from 'vuex';
import { createStore, Module } from 'vuex-smart-module';
import Bot from './bot';

Vue.use(Vuex);

const RootStore = new Module({
  modules: {
    Bot,
  },
});

export const store = createStore(RootStore, {
  strict: process.env.NODE_ENV !== 'production',
});
