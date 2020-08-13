<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Test: {{test}}</h2>
    <button @click="testAction(`Hello, User! ${Date.now()}`)">Press</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

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
