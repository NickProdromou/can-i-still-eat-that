export interface IFirebaseAppConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

export interface INavigationDrawerLink {
  to: string;
  title: string;
  auth: boolean;
  icon: string;
}

export interface IAppConfig {
  firebaseApp: IFirebaseAppConfig;
  drawerLinks: INavigationDrawerLink[];
}
