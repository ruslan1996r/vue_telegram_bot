<template>
  <div>
    <div v-if="allBots.length">
      <v-col cols="12" v-for="bot in allBots" :key="bot.id">
        <v-hover v-slot:default="{ hover }">
          <v-card
            :class="{ 'on-hover': hover }"
            :elevation="hover ? 16 : 2"
            outlined
            color="#952175"
            text
            style="background:none"
          >
            <div class="d-flex flex-no-wrap justify-space-between align-center">
              <v-col>
                <v-btn class="mb-8" text @click="deleteBotById(bot.id)">
                  <v-icon>mdi-delete-empty</v-icon>
                </v-btn>
                <v-btn text @click="changeDialogShow({show:true, botId:bot.id})">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-col>
              <p></p>
              <div style="width: 100%;">
                <v-card-title class="headline" v-text="bot.name"></v-card-title>
                <v-card-subtitle v-text="bot.date"></v-card-subtitle>
                <v-card-text>{{bot.description}}</v-card-text>
              </div>
              <v-avatar class="ma-3" size="150" tile>
                <v-img :src="fileToImage(bot.image)"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-hover>
      </v-col>
    </div>
    <div class="text-center mb-5" v-else>
      <h2>No bots</h2>
    </div>
    <v-row class="justify-center">
      <v-btn color="primary" dark @click="changeDialogShow({show:true})">Create a new bot</v-btn>
    </v-row>
    <Modal actionType="Create a new bot" :addNewBot="addNewBot" :updateBot="updateBot" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Provide, Watch } from "vue-property-decorator";

import { botMapper } from "@/store/bot";
import Modal from "@/components/Modal.vue";

const Mappers = Vue.extend({
  computed: {
    ...botMapper.mapGetters(["allBots"]),
  },
  methods: {
    ...botMapper.mapActions({
      addNewBot: "addNewBot",
      updateBot: "updateBot",
      deleteBotById: "deleteBotById",
      changeDialogShow: "changeDialogShow",
    }),
  },
  components: {
    Modal,
  },
});

@Component
export default class Home extends Mappers {
  private fileToImage(img: any): string {
    if (img) {
      return URL.createObjectURL(img[0]);
    }
    return "https://miro.medium.com/max/300/1*wZh2dMhuGVSWc8LFZg8hCw.png"; // default image
  }
}
</script>
<style scoped>
.v-card {
  transition: opacity 0.2s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.6;
}
</style>