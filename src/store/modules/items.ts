import { VuexModule, Module } from 'vuex-module-decorators';

@Module({ name: 'items', namespaced: true })
export default class Items extends VuexModule {}
