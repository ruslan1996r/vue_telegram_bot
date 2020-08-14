<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">{{actionType}}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form">
              <v-text-field
                color="#952175"
                label="Bot name"
                required
                prepend-icon="mdi-card-text"
                :rules="inputRules"
                v-model="name"
              ></v-text-field>
              <v-text-field
                color="#952175"
                label="Bot description"
                prepend-icon="mdi-pencil"
                :rules="inputRules"
                v-model="description"
              ></v-text-field>
              <DatePicker @change-date="changeDate" :rules="inputRules" />
              <v-file-input
                color="#952175"
                v-model="image"
                multiple
                label="File input"
              ></v-file-input>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="changeDialogShow({show:false})">Close</v-btn>
          <v-btn color="blue darken-1" text @click="submitForm()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue, Provide, Watch } from 'vue-property-decorator';

import { botMapper } from '../store/bot';
import DatePicker from './DatePicker.vue';
import { IBot, StringValidator } from '@/types';

const Mappers = Vue.extend({
  computed: {
    ...botMapper.mapGetters(['dialog', 'currentBot']),
  },
  methods: {
    ...botMapper.mapActions({
      changeDialogShow: 'changeDialogShow',
    }),
  },
  components: {
    DatePicker,
  },
});

@Component
export default class HelloWorld extends Mappers {
  @Provide() private botId: number = 0;
  @Provide() private name: string = '';
  @Provide() private description: string = '';
  @Provide() private image: File | null = null;
  @Provide() private date: string = new Date().toISOString().substr(0, 10);
  @Provide() private inputRules: StringValidator[] = [
    (v: string) => (v && v.length >= 0) || 'Field is required',
  ];

  @Prop() private actionType!: string;
  @Prop() private addNewBot!: (bot: IBot) => IBot[];
  @Prop() private updateBot!: (bot: IBot) => IBot[];

  public changeDate(newDate: string): string {
    return (this.date = newDate);
  }

  public submitForm(): void {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      const newBot: IBot = {
        id: this.botId,
        name: this.name,
        description: this.description,
        date: this.date,
        image: this.image,
      };
      this.name = '';
      this.description = '';
      this.date = new Date().toISOString().substr(0, 10);
      this.image = null;

      if (this.currentBot) {
        this.changeDialogShow({ show: false, botId: 0 });
        this.updateBot(newBot);
        return;
      }
      newBot.id = Math.random();
      this.addNewBot(newBot);
      this.changeDialogShow({ show: false, botId: 0 });
    }
  }

  @Watch('currentBot')
  public changeFields() {
    if (this.currentBot) {
      this.botId = this.currentBot!.id;
      this.name = this.currentBot!.name;
      this.description = this.currentBot!.description;
      this.date = this.currentBot!.date;
      this.image = this.currentBot!.image;
    }
  }
}
</script>
