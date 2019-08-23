import FirebaseService from '@/firebase';
import Vue from 'vue';
import Vuex from 'vuex';
import { IRootState } from '@/store/models';
import User from './modules/user';
import Items from './modules/items';

Vue.use(Vuex);

export default new Vuex.Store<IRootState>({
  state: {
    firebaseService: new FirebaseService()
  },
  modules: {
    user: User,
    items: Items
  }
});
