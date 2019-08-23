import { IdentifiedPerishableItem, ItemCategories, PerishableItem, GenericFirebaseError } from '@/firebase/models';
import { Nullable, Existable } from '@/shared/types';
import { Action, Module, VuexModule, Mutation } from 'vuex-module-decorators';
import { IRootState, LoadingState, IItemsModule, IUserModule } from '../models';
import User from './user';
import { isUserCredential, isItemCategories, isDocumentReference } from '../guards';

@Module({ name: 'items', namespaced: true })
export default class Items extends VuexModule<IItemsModule, IRootState> {
  private items: IdentifiedPerishableItem[] = [];
  private currentCategory: Existable<ItemCategories>;
  private itemsState: LoadingState = LoadingState.pending;
  private temporaryDocument: Nullable<firebase.firestore.DocumentReference> = null;
  private itemsError: Nullable<GenericFirebaseError> = null;
  private upload: Nullable<firebase.storage.UploadTask> = null;

  get getItems() {
    return this.items;
  }

  get getItemState() {
    return this.itemsState;
  }

  get getTemporaryDocument() {
    return this.temporaryDocument;
  }

  get getItemsError() {
    return this.itemsError;
  }

  get uploadState() {
    return this.upload;
  }

  get selectedCategory() {
    return this.currentCategory;
  }

  @Action
  public getItemsForCategory() {
    const { commit, rootState } = this.context;
    const currentUser = (rootState.user as IUserModule).getUser;
    const category = this.currentCategory;

    if (isUserCredential(currentUser) && isItemCategories(category)) {
      commit('setItemsState', LoadingState.loading);
      rootState.firebaseService
        .getItemsFromCategory(currentUser, category)
        .then(items => {
          commit('setItemState', LoadingState.complete);
          commit('setItems', items);
        })
        .catch(err => {
          commit('setItemState', LoadingState.error);
          commit('setItemsError', err);
        });
    } else {
      commit('setItemsError', { code: 'items/action/getItemsForCategory', message: 'user or category not defined' });
    }
  }

  @Action
  public deleteItem(key: string): void {
    const { commit, rootState } = this.context;
    const currentUser = (rootState.user as IUserModule).getUser;
    const category = this.currentCategory;

    if (isUserCredential(currentUser) && isItemCategories(category)) {
      rootState.firebaseService
        .deleteItem(currentUser, category, key)
        .then(() => {
          this.getItemsForCategory();
        })
        .catch(err => {
          commit('setItemsError', err);
        });
    } else {
      commit('setItemsError', { code: 'items/deleteItem', message: 'user invalid' });
    }
  }

  @Action
  public uploadPhoto(file: File): void {
    const { commit, rootState } = this.context;
    const currentUser = (rootState.user as IUserModule).getUser;
    const category = this.currentCategory;
    const reference = this.temporaryDocument;

    if (isUserCredential(currentUser) && isDocumentReference(reference) && isItemCategories(category)) {
      rootState.firebaseService
        .uploadImage(currentUser, category, reference, file)
        .then(task => {
          commit('setUploadTask', task);
        })
        .catch(err => {
          commit('setItemsError', err);
        });
    } else {
      commit('setItemsError', { code: 'items/uploadPhoto', message: 'user, documentReference or itemCategory invalid' });
    }
  }

  @Action
  public createTemporaryDocumentReference(): void {
    const { commit, rootState } = this.context;
    const currentUser = (rootState.user as IUserModule).getUser;
    const category = this.currentCategory;

    if (isUserCredential(currentUser) && isItemCategories(category)) {
      rootState.firebaseService
        .createNewItemReference(currentUser, category)
        .then(docRef => {
          commit('setTemporaryDocumentReference', docRef);
        })
        .catch(err => {
          commit('setItemsError', err);
        });
    } else {
      commit('setItemsError', { code: 'items/createTemporaryDocumentReference', message: 'user or category invalid' });
    }
  }

  @Action
  public addItem(itemData: PerishableItem): void {
    const { commit, rootState } = this.context;
    const currentUser = (rootState.user as IUserModule).getUser;

    rootState.firebaseService
      .addItem(this.temporaryDocument as firebase.firestore.DocumentReference, itemData)
      .then(() => {
        if (currentUser && isUserCredential(currentUser)) {
          this.getItemsForCategory();
        } else {
          commit('setItemsError', {
            code: 'auth/no-current-user',
            message: 'unable to get items without user'
          });
        }
      })
      .catch(error => {
        commit('setItemsError', error);
      });
  }

  @Action
  public setCurrentCategory(category: ItemCategories) {
    this.context.commit('setCategory', ItemCategories);
  }

  @Mutation
  private setCategory(category: ItemCategories) {
    this.currentCategory = category;
  }

  @Mutation
  private setItems(items: IdentifiedPerishableItem[]) {
    this.items = items;
  }

  @Mutation
  private setItemsState(state: LoadingState) {
    this.itemsState = state;
  }

  @Mutation
  private setItemsError(error: GenericFirebaseError) {
    this.itemsError = error;
  }

  @Mutation
  private setUploadTask(task: firebase.storage.UploadTask) {
    this.upload = task;
  }

  @Mutation
  private setTemporaryDocumentReference(doc: firebase.firestore.DocumentReference) {
    this.temporaryDocument = doc;
  }
}
