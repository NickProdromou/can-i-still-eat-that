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
  },
  drawerLinks: [
    { title: 'Items', auth: true, to: '/items' },
    { title: 'Add new item', auth: true, to: '/add-item' },
    { title: 'Profile', auth: true, to: '/profile' },
    { title: 'Sign Up', auth: false, to: '/sign-up' },
    { title: 'sign In', auth: false, to: '/sign-in' },
  ]
};

export default config;
