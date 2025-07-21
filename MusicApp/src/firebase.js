import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD6QagbJPrIvDSZ17yEAyKXQ6PuORNLNEc",
  authDomain: "musicbooking-7756e.firebaseapp.com",
  projectId: "musicbooking-7756e",
  appId: "1:673725138714:web:e6573cb617ce6e43d94ea3",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider };
