import { Nullable } from '@/shared/types';

export enum ItemCategories {
  Fridge = 'fridge',
  Pantry = 'pantry',
  Freezer = ' freezer'
}

export enum ExpiryType {
  BestBefore = 'Best Before',
  UseBy = 'Use By'
}

export interface PerishableItem {
  name: string;
  openedData: Date;
  expiryType: ExpiryType;
  UseWithin?: Date;
  image?: string;
}

export interface IdentifiedPerishableItem extends PerishableItem {
  id: string;
}

export interface IFirebaseService {
  addItem(documentRef: firebase.firestore.DocumentReference, item: PerishableItem): Promise<void | GenericFirebaseError>;

  createEmailAccount(email: string, password: string): Promise<firebase.auth.UserCredential | GenericFirebaseError>;

  signInWithEmail(emailAddress: string, password: string): Promise<firebase.auth.UserCredential | GenericFirebaseError>;

  signUserOut(): Promise<void | GenericFirebaseError>;

  deleteUser(user: Nullable<firebase.auth.UserCredential>): Promise<void>;

  getItemsFromCategory(
    user: Nullable<firebase.auth.UserCredential>,
    category: ItemCategories
  ): Promise<IdentifiedPerishableItem[] | GenericFirebaseError>;

  createNewItemReference(
    user: Nullable<firebase.auth.UserCredential>,
    category: ItemCategories
  ): Promise<firebase.firestore.DocumentReference | firebase.firestore.FirestoreError>;

  uploadImage(
    user: Nullable<firebase.auth.UserCredential>,
    category: ItemCategories,
    reference: firebase.firestore.DocumentReference,
    file: File
  ): Promise<firebase.storage.UploadTask | GenericFirebaseError>;

  destroyStaleReference(documentRef: firebase.firestore.DocumentReference): Promise<void>;

  deleteItem(user: Nullable<firebase.auth.UserCredential>, category: ItemCategories, key: string): Promise<void | GenericFirebaseError>;
}

export interface GenericFirebaseError {
  code: string;
  message: string;
}
