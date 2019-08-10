import { IFirebaseService, ItemCategories, PerishableItem, GenericFirebaseError } from './models';
import FirebaseInit from './firebaseInit';
import config from '../config/index';

@FirebaseInit(config.firebaseApp)
export default class FirebaseService implements IFirebaseService {
  private currentUser: firebase.auth.UserCredential | null = null;
  private firebaseInstance!: firebase.app.App;

  private get firstore() {
    return this.firebaseInstance.firestore();
  }

  private get auth() {
    return this.firebaseInstance.auth();
  }

  private get storage() {
    return this.firebaseInstance.storage();
  }

  public addItem(documentRef: firebase.firestore.DocumentReference, item: PerishableItem): Promise<void> {
    return documentRef.set(item);
  }

  public createEmailAccount(email: string, password: string): Promise<void | GenericFirebaseError> {
    return new Promise((resolve, reject) => {
      this.auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
          this.currentUser = userCredentials;
          resolve();
        })
        .catch(err => reject(err));
    });
  }

  public signInWithEmail(emailAddress: string, password: string): Promise<void | GenericFirebaseError> {
    return new Promise((resolve, reject) => {
      this.auth
        .signInWithEmailAndPassword(emailAddress, password)
        .then(userCredentials => {
          this.currentUser = userCredentials;
          resolve();
        })
        .catch(error => reject(error));
    });
  }

  public createNewItemReference(category: ItemCategories): Promise<firebase.firestore.DocumentReference | firebase.firestore.FirestoreError> {
    return new Promise((resolve, reject) => {
      if (this.currentUser && this.currentUser.user) {
        const userPath = this.currentUser.user.uid;
        const newDocumentRef = this.firstore.collection(`items/${userPath}/${category}/`).doc();

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
    category: ItemCategories,
    reference: firebase.firestore.DocumentReference,
    file: File
  ): Promise<firebase.storage.UploadTask | GenericFirebaseError> {
    return new Promise((resolve, reject) => {
      if (this.currentUser && this.currentUser.user) {
        const userPath = this.currentUser.user.uid;

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
}
