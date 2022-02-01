import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBgSf7mBpsiQcDkPIjil24r5DVRLXgfhDQ",
  authDomain: "vue-blog-80cc6.firebaseapp.com",
  projectId: "vue-blog-80cc6",
  storageBucket: "vue-blog-80cc6.appspot.com",
  messagingSenderId: "336254097134",
  appId: "1:336254097134:web:d1d4164153600e1823c5ff",
  measurementId: "G-GXMRDFXZLF"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp }
export default app.firestore();