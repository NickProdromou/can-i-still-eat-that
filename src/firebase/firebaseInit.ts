import firebase from 'firebase';
import { IFirebaseService } from './models';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

import { IFirebaseAppConfig } from '../config/models';

export default function FirebaseInit(config: IFirebaseAppConfig) {
  firebase.initializeApp(config);

  return <T extends IFirebaseService>(constructor: new () => T): void => {
    constructor.prototype.firebaseInstance = firebase;
  };
}