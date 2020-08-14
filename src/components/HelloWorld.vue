<template>
  <div id="app">
    <div class="hello">
      <h1>{{ msg }}</h1>
      <h2>Test: {{test}}</h2>
      <button @click="testAction(`Hello, User! ${Date.now()}`)">Press</button>
      <div class="my-2">
        <v-btn depressed color="error">Error</v-btn>
      </div>
      <div class="my-2">
        <v-btn depressed color="primary">Primary</v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Provide } from 'vue-property-decorator';

import { botMapper } from '../store/bot';

const Mappers = Vue.extend({
  computed: {
    // ...botMapper.mapGetters(["test"]),
  },
  methods: {
    ...botMapper.mapActions({
      // testAction: "testAction",
    }),
  },
});

@Component
export default class HelloWorld extends Mappers {
  @Prop() private msg!: string;
}
</script>
