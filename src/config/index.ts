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
    { title: 'Items', auth: true, to: '/items', icon: 'mdi-food' },
    { title: 'Add new item', auth: true, to: '/add-item', icon: 'mdi-plus' },
    { title: 'Profile', auth: true, to: '/profile', icon: 'mdi-account-circle' },
    { title: 'Sign In', auth: false, to: '/sign-in', icon: 'mdi-account' },
    { title: 'Sign Up', auth: false, to: '/sign-up', icon: 'mdi-account-plus' }
  ]
};

export default config;
