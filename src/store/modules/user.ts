import { GenericFirebaseError } from '@/firebase/models';
import { Nullable } from '@/shared/types';
import { IRootState, LoadingState, IUserModule } from '@/store/models';
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { isUserCredential } from '../guards';

@Module({ name: 'user', namespaced: true })
export default class User extends VuexModule<{}, IRootState> {
  private userError: Nullable<GenericFirebaseError> = null;
  private currentUser: Nullable<firebase.auth.UserCredential> = null;
  private userState: LoadingState = LoadingState.pending;

  public get getUser() {
    return this.currentUser;
  }

  public get getUserState() {
    return this.userState;
  }

  public get getUserError() {
    return this.userError;
  }

  @Action
  public fetchUserWithEmailLogin(args: { username: string; password: string }): void {
    const { username, password } = args;
    const { rootState, commit } = this.context;

    commit('setUserState', LoadingState.pending);

    rootState.firebaseService
      .signInWithEmail(username, password)
      .then(user => {
        if (isUserCredential(user)) {
          commit('setUserState', LoadingState.complete);
          commit('setSignedInUser', user);
        } else {
          commit('setUserState', LoadingState.error);
        }
      })
      .catch(err => {
        commit('setUserState', LoadingState.error);
        commit('setUserError', err);
      });
  }

  @Action
  public signUserOut(): void {
    const { rootState, commit } = this.context;

    rootState.firebaseService
      .signUserOut()
      .then(() => {
        commit('setUserState', LoadingState.complete);
        commit('setSignedOutUser');
      })
      .catch(err => {
        commit('setUserState', LoadingState.error);
        commit('setUserError', err);
      });
  }

  @Action
  public createUser(args: { username: string; password: string }): void {
    const { username, password } = args;
    const { rootState, commit } = this.context;

    rootState.firebaseService
      .createEmailAccount(username, password)
      .then(user => {
        if (isUserCredential(user)) {
          commit('setUserState', LoadingState.complete);
          commit('setSignedInUser', user);
        } else {
          commit('setUserState', LoadingState.error);
        }
      })
      .catch(err => {
        commit('setUserState', LoadingState.error);
        commit('setUserError', err);
      });
  }

  @Mutation
  private setSignedInUser(user: firebase.auth.UserCredential) {
    this.currentUser = user;
  }

  @Mutation
  private setSignedOutUser() {
    this.currentUser = null;
  }

  @Mutation
  private setUserState(state: LoadingState) {
    this.userState = state;
  }

  @Mutation
  private setUserError(error: GenericFirebaseError) {
    this.userError = error;
  }
}
