import { IAppConfig } from './models';

const config: IAppConfig = {
  firebaseApp: {
    apiKey: process.env.VUE_APP_firebase_apiKey,
    authDomain: process.env.VUE_APP_firebase_authDomain,
    databaseURL: process.env.VUE_APP_firebase_databaseURL,
    projectId: process.env.VUE_APP_firebase_projectId,
    storageBucket: process.env.VUE_APP_firebase_storageBucket,
    messagingSenderId: process.env.VUE_APP_firebase_messagingSenderId,
    appId: process.env.VUE_APP_firebase_appId
  }
};

export default config;
