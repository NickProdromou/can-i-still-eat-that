import FirebaseService from '@/firebase';
import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { IRootState } from '@/store/models';
import User from './modules/user';
import Items from './modules/items';
import UI from './modules/ui';

Vue.use(Vuex);

const store: StoreOptions<IRootState> = {
  state: {
    firebaseService: new FirebaseService()
  },
  modules: {
    user: User,
    items: Items,
    ui: UI
  }
};

export default new Vuex.Store<IRootState>(store);
