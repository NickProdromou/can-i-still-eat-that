<template>
  <v-list>
    <slot :filteredLinks="filteredLinks"></slot>
  </v-list>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import UserModule from '@/store/modules/user';
import { getModule } from 'vuex-module-decorators';
import config from '@/config/index';
import store from '../store';

@Component
export default class LinkProvider extends Vue {
  private User = getModule(UserModule, store);
  private links = config.drawerLinks;

  private get isUserAuth() {
    return this.User.getUser !== null;
  }

  private get filteredLinks() {
    return this.links.filter(l => l.auth === this.isUserAuth);
  }
}
</script>
