import firebaseConfig from './firebaseConfig';
import { initializeApp } from 'firebase/app';

// Initialize Firebase
const initialization = () => initializeApp(firebaseConfig);
export default initialization