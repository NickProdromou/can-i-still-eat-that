import { IFirebaseService } from '@/firebase/models';

export interface IRootState {
  firebaseService: IFirebaseService;
}

export enum LoadingState {
  pending = 'pending',
  loading = 'loading',
  complete = 'complete',
  error = 'error'
}
