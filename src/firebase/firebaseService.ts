import { GenericFirebaseError, IFirebaseService, ItemCategories, PerishableItem, IdentifiedPerishableItem } from './models';
import { Nullable } from '@/shared/types';
import config from '../config/index';
import FirebaseInit from './firebaseInit';

@FirebaseInit(config.firebaseApp)
export default class FirebaseService implements IFirebaseService {
  private firebaseInstance!: firebase.app.App;

  private get firestore() {
    return this.firebaseInstance.firestore();
  }

  private get auth() {
    return this.firebaseInstance.auth();
  }

  private get storage() {
    return this.firebaseInstance.storage();
  }

  public addItem(documentRef: firebase.firestore.DocumentReference, item: PerishableItem): Promise<void | GenericFirebaseError> {
    return new Promise((resolve, reject) => {
      try {
        documentRef.set(item);

        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

  public createEmailAccount(email: string, password: string): Promise<firebase.auth.UserCredential | GenericFirebaseError> {
    return new Promise((resolve, reject) => {
      this.auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
          resolve(userCredentials);
        })
        .catch(err => reject(err));
    });
  }

  public deleteUser(user: Nullable<firebase.auth.UserCredential>): Promise<void> {
    return new Promise((resolve, reject) => {
      if (user && user.user) {
        this.deleteUserData(user.user.uid);
        resolve(user.user.delete());
      } else {
        reject({
          code: 'auth/no-current-user',
          message: 'unable to delete user'
        });
      }
    });
  }

  public signInWithEmail(emailAddress: string, password: string): Promise<firebase.auth.UserCredential | GenericFirebaseError> {
    return new Promise((resolve, reject) => {
      this.auth
        .signInWithEmailAndPassword(emailAddress, password)
        .then(userCredentials => {
          resolve(userCredentials);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  public signUserOut(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.auth
        .signOut()
        .then(() => {
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  public getItemsFromCategory(
    user: Nullable<firebase.auth.UserCredential>,
    category: ItemCategories
  ): Promise<IdentifiedPerishableItem[] | GenericFirebaseError> {
    return new Promise(async (resolve, reject) => {
      if (user && user.user) {
        const docRef = this.firestore.collection('items').doc(`${user.user.uid}`);
        const collection = await docRef.collection(category).get();

        const mappedCollections = collection.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));

        resolve(mappedCollections as IdentifiedPerishableItem[]);
      } else {
        reject({
          code: 'auth/no-current-user',
          message: 'unable to get items'
        });
      }
    });
  }

  public createNewItemReference(
    user: Nullable<firebase.auth.UserCredential>,
    category: ItemCategories
  ): Promise<firebase.firestore.DocumentReference | firebase.firestore.FirestoreError> {
    return new Promise((resolve, reject) => {
      if (user && user.user) {
        const userPath = user.user.uid;
        const newDocumentRef = this.firestore.collection(`items/${userPath}/${category}/`).doc();

        resolve(newDocumentRef);
      } else {
        reject({
          code: 'auth/no-current-user',
          message: 'unable to create reference'
        });
      }
    });
  }

  public uploadImage(
    user: Nullable<firebase.auth.UserCredential>,
    category: ItemCategories,
    reference: firebase.firestore.DocumentReference,
    file: File
  ): Promise<firebase.storage.UploadTask | GenericFirebaseError> {
    return new Promise((resolve, reject) => {
      if (user && user.user) {
        const userPath = user.user.uid;

        resolve(this.storage.ref(`items/${userPath}/${category}/${reference.id}`).put(file));
      } else {
        reject({
          code: 'auth/no-current-user',
          message: 'unable to upload image'
        });
      }
    });
  }

  public destroyStaleReference(documentRef: firebase.firestore.DocumentReference): Promise<void> {
    return documentRef.delete();
  }

  public deleteItem(user: Nullable<firebase.auth.UserCredential>, category: ItemCategories, key: string): Promise<void | GenericFirebaseError> {
    return new Promise((resolve, reject) => {
      if (user && user.user) {
        const userItems = this.firestore.collection('items').doc(user.user.uid);
        const itemToDelete = userItems.collection(category).doc(key);

        resolve(itemToDelete.delete());
      } else {
        reject({
          code: 'auth/no-current-user',
          message: 'unable to delete item'
        });
      }
    });
  }

  private deleteUserData(uid: string): void {
    this.firestore
      .collection('items')
      .doc(uid)
      .delete();
    this.storage.ref(`items/${uid}`).delete();
  }
}
