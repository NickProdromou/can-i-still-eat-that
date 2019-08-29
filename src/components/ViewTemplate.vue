<template>
  <v-container>
    <v-layout text-center wrap>
      <v-container class="fill-height" fluid>
        <v-row>
          <v-col cols="6" class="text-left">
            <span class="subtitle-1 gray-text lighten-3">
              <v-icon size="18">mdi-home</v-icon>
              /{{ name }}
            </span>
          </v-col>
        </v-row>
      </v-container>
      <slot name="content" class="mt-4"></slot>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ViewTemplate extends Vue {
  @Prop() private name!: string;
}
</script>
