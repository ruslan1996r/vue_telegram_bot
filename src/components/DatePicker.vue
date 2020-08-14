<template>
  <v-menu
    v-model="showCalendar"
    :close-on-content-click="false"
    :nudge-right="140"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        label="Pick date"
        prepend-icon="mdi-calendar-month-outline"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="date" @input="showCalendar = false"></v-date-picker>
  </v-menu>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
  Provide,
  Emit,
  Watch,
} from 'vue-property-decorator';
@Component
export default class DatePicker extends Vue {
  @Provide() private showCalendar: boolean = false;
  @Provide() private date: string = new Date().toISOString().substr(0, 10);

  @Watch('date')
  @Emit('change-date')
  public changeDate(): string {
    return this.date;
  }
}
</script>