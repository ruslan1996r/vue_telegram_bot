<template>
  <v-app>
    <v-app-bar app clipped-left>
      <v-toolbar-title>Telegram chat bots</v-toolbar-title>
      <!-- <div>
        <router-link to="/">Home</router-link>|
        <router-link to="/about">About</router-link>
      </div> -->
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>


