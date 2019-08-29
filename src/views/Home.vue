<template>
  <ViewTemplate :name="$route.name">
    <template v-slot:content>
      <p>login/signup</p>
    </template>
  </ViewTemplate>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import ViewTemplate from '@/components/ViewTemplate.vue';

@Component({
  components: {
    ViewTemplate
  }
})
export default class Home extends Vue {}
</script>
