<template>
  <div>
    <v-list-item link :href="link.to">
      <v-list-item-icon>
        <v-icon dense>{{ link.icon }}</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>{{ link.title }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Component } from 'vue-property-decorator';

interface Link {
  to: string;
  title: string;
  icon: string;
}

@Component
export default class DrawerLink extends Vue {
  @Prop() private link!: Link;
}
</script>

<style lang='sass'>
</style>
