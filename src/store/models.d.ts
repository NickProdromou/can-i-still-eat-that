import { Nullable } from './../shared/types.d';
import { IFirebaseService, GenericFirebaseError, IdentifiedPerishableItem } from '@/firebase/models';

export interface IUserModule {
  getUser: Nullable<firebase.auth.UserCredential>;
  getUserState: LoadingState;
  getUserError: Nullable<GenericFirebaseError>;
}

export interface IItemsModule {
  getItems: IdentifiedPerishableItem[];
  getItemState: LoadingState;
  getTemporaryDocument: Nullable<firebase.firestore.DocumentReference>;
  getItemsError: Nullable<GenericFirebaseError>;
  getUploadState: Nullable<firebase.storage.UploadTask>;
}

export enum LoadingState {
  pending = 'pending',
  loading = 'loading',
  complete = 'complete',
  error = 'error'
}

export interface IRootState {
  firebaseService: IFirebaseService;
  user?: IUserModule;
  items?: IItemsModule;
}
