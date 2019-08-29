<template>
  <v-app-bar app color="light-blue darken-3" dark>
    <v-icon class="mr-3" @click="toggleDrawer">mdi-menu</v-icon>
    <v-toolbar-title class="headline text-uppercase">
      <span class="font-weight-light text-lowercase">can I still eat that?</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import store from '@/store';
import UI from '@/store/modules/ui';

@Component
export default class AppHeader extends Vue {
  private UiModule = getModule(UI, store);

  private toggleDrawer() {
    this.UiModule.toggleDrawer();
  }
}
</script>

<style lang='sass'>
</style>
