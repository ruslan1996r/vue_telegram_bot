<template>
  <div id="app">
    <v-app id="inspire">
      <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" app clipped>
          <v-list dense>
            <v-list-item link>
              <v-list-item-action>
                <v-icon>mdi-view-dashboard</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Dashboard</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link>
              <v-list-item-action>
                <v-icon>mdi-cog</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Settings</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>

        <v-app-bar app clipped-left>
          <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          <v-toolbar-title>Application</v-toolbar-title>
        </v-app-bar>

        <v-main>
          <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
              <v-col class="shrink">
                <v-tooltip right>
                  <span>Source</span>
                </v-tooltip>
              </v-col>
            </v-row>
          </v-container>
        </v-main>

        <v-footer app>
          <span>&copy; {{ new Date().getFullYear() }}</span>
        </v-footer>
      </v-app>
    </v-app>
  </div>
</template>

<script lang="ts">
//  <div class="hello">
//     <h1>{{ msg }}</h1>
//     <h2>Test: {{test}}</h2>
//     <button @click="testAction(`Hello, User! ${Date.now()}`)">Press</button>
//     <div class="my-2">
//       <v-btn depressed color="error">Error</v-btn>
//     </div>
//     <div class="my-2">
//       <v-btn depressed color="primary">Primary</v-btn>
//     </div>
//   </div>
import { Component, Prop, Vue, Provide } from "vue-property-decorator";

import { botMapper } from "../store/bot";

const Mappers = Vue.extend({
  computed: {
    ...botMapper.mapGetters(["test"]),
  },
  methods: {
    ...botMapper.mapActions({
      testAction: "testAction",
    }),
  },
});

@Component
export default class HelloWorld extends Mappers {
  @Provide() drawer: boolean = false;
  @Prop() private msg!: string;
}
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
h2 {
  color: red;
}
</style>
