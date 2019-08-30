<template>
  <v-navigation-drawer stateless :value="drawerOpen" app>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">Application</v-list-item-title>
        <v-list-item-subtitle>subtext</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <LinkProvider v-slot="{ filteredLinks }">
      <template v-for="link in filteredLinks">
        <DrawerLink :key="link.title" :link="link"></DrawerLink>
      </template>
    </LinkProvider>
  </v-navigation-drawer>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import LinkProvider from '@/components/LinkProvider.vue';
import DrawerLink from '@/components/DrawerLink.vue';
import store from '@/store';
import UI from '@/store/modules/ui';

@Component({
  components: { DrawerLink, LinkProvider }
})
export default class NavigationDrawer extends Vue {
  private UIModule = getModule(UI, store);

  private get drawerOpen() {
    return this.UIModule.mainNavigationDrawer;
  }
}
</script>
