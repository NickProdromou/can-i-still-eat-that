<template>
  <v-navigation-drawer :value="drawerOpen" app color="blue-grey darken-4">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">Application</v-list-item-title>
        <v-list-item-subtitle>subtext</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-navigation-drawer>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import store from '@/store';
import UI from '@/store/modules/ui';

@Component
export default class NavigationDrawer extends Vue {
  private UIModule = getModule(UI, store);

  private get drawerOpen() {
    return this.UIModule.mainNavigationDrawer;
  }
}
</script>
