<template>
  <v-app>
    <NavigationDrawer></NavigationDrawer>
    <AppHeader></AppHeader>
    <v-content>
      <router-view></router-view>
    </v-content>
    <AppFooter></AppFooter>
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import NavigationDrawer from './components/NavigationDrawer.vue';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';

@Component({
  components: {
    NavigationDrawer,
    AppHeader,
    AppFooter
  }
})
export default class App extends Vue {}
</script>
