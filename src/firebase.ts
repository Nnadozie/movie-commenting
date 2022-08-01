import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { getDatabase, ref, set, push, onValue, serverTimestamp } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyD5fQ_yklmQWMfQUc1jbO70b9e5DVFusS0',
  authDomain: 'movie-commenting.firebaseapp.com',
  databaseURL: 'https://movie-commenting-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'movie-commenting',
  storageBucket: 'movie-commenting.appspot.com',
  messagingSenderId: '1033010074298',
  appId: '1:1033010074298:web:004b3bc8c2eac05a4ee883',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export {
  auth,
  provider,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
  getDatabase,
  ref,
  set,
  serverTimestamp,
  onValue,
  push,
};
export default app;
