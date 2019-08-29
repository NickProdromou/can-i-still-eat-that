import { IRootState, IUiModule } from '@/store/models';
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';

enum DrawerState {
  open = 'open',
  closed = 'closed'
}

@Module({ name: 'ui', namespaced: true })
export default class UI extends VuexModule<{}, IRootState> {
  private drawerState: DrawerState = DrawerState.closed;

  get mainNavigationDrawer() {
    switch (this.drawerState) {
      case DrawerState.open:
        return true;
        break;
      case DrawerState.closed:
        return false;
    }
  }

  @Action
  public toggleDrawer() {
    const { commit } = this.context;

    commit('updateDrawerState');
  }

  @Mutation
  private updateDrawerState() {
    this.drawerState = this.drawerState === DrawerState.open ? DrawerState.closed : DrawerState.open;
  }
}
